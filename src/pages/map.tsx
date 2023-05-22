import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Session } from "@/models/auth/Session";

import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import Navbar from "@/components/Navbar";
import ErrorGeolocation from "@/components/ErrorGeoLocation";

const MapWithNoSSR = dynamic(
  () => import("../components/layout/map/MapComponent"),
  {
    ssr: false,
  }
);

export default function Map() {
  const [location, setLocation] = useState([
    null as unknown as number,
    null as unknown as number,
  ]);

  const [geolocationError, setGeolocationError] = useState(false);
  const { data: session, status } = useSession({ required: true });
  const [listBars, setListBars] = useState({} as unknown as any);

  const {
    isLoading,
    isError,
    data: loggedUser,
    error,
  } = useQuery({
    queryKey: ["LoggedUser"],
    refetchOnWindowFocus: false,
    enabled: status === "authenticated",
    queryFn: async () => {
      const { user } = session as unknown as Session;

      return fetch(`/api/users/${user.id}`)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          return err;
        });
    },
  });

  const {
    data,
    isError: isErrorListBars,
    isLoading: isLoadingListBars,
    error: errorListBars,
  } = useQuery({
    queryKey: ["listBars"],
    refetchOnWindowFocus: false,
    enabled:
      Boolean(loggedUser) &&
      (loggedUser.location?.length > 0 || location[0] !== null),
    queryFn: async () => {
      ///Utiliser api de noratim

      let urlBars = new URL(
        "https://data.opendatasoft.com/api/v2/catalog/datasets/osm-fr-bars%40babel/exports/json?"
      );

      let coordinates;
      if (location[0] === null || location[1] === null) {
        const co = loggedUser.location.split(",");
        coordinates = co[1].toString() + " " + co[0].toString();
      } else
        coordinates = location[1].toString() + " " + location[0].toString();

      urlBars.searchParams.append(
        "where",
        `distance(geo_point_2d,geom'POINT(${coordinates})',${loggedUser.distance}km)`
      );
      urlBars.searchParams.append("limit", "-1");
      urlBars.searchParams.append("offset", "0");
      urlBars.searchParams.append("timezone", `UTC`);

      return fetch(urlBars.toString())
        .then((res) => res.json())
        .catch((err) => {
          return err;
        });
    },
    onSuccess: (data) => {
      // filter data where name is not null
      const filteredData = data.filter((bar: any) => bar.name !== null);
      setListBars(filteredData);
    },
  });

  const userSetLocation = useMutation({
    mutationFn: async (position: string) => {
      const pos = {
        location: position,
      };

      return fetch(`/api/users/${loggedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pos),
      })
        .then((res) => {
          res.json();
        })
        .catch((err) => {
          return err;
        });
    },
  });

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      successPosition,
      errorPosition,
      geolocationOptions
    );
  }, [loggedUser]);

  function successPosition(position: GeolocationPosition) {
    if (
      position.coords.latitude === location[0] &&
      position.coords.longitude === location[1]
    ) {
      return;
    }

    setLocation([position.coords.latitude, position.coords.longitude]);
    setGeolocationError(false);

    if (!loggedUser) return;
    userSetLocation.mutate(
      `${position.coords.latitude},${position.coords.longitude}`
    );
  }

  function errorPosition(error: GeolocationPositionError) {
    setGeolocationError(true);
  }

  return (
    <>
      {geolocationError ? (
        <ErrorGeolocation />
      ) : isError || isErrorListBars ? (
        <ErrorPage />
      ) : isLoading ||
        isLoadingListBars ||
        location[0] === null ||
        location[1] === null ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar variant={"fixed"} />
          <MapWithNoSSR location={location} listBars={listBars} />
        </>
      )}
    </>
  );
}
