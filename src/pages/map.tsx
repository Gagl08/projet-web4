import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";

import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import Navbar from "@/components/Navbar";

export default function Map() {
  const [location, setLocation] = useState([
    null as unknown as number,
    null as unknown as number,
  ]);
  const toast = useToast({ position: "bottom" });
  const idSaveToast = "saved_location";
  const { data: session, status } = useSession();

  //faire un useQuery pour récupérer les bars et restaurants et en meme temps regarder si l'user a une location
  //Si oui, faire une mutation avec navigator.geolocation.getCurrentPosition pour mettre à jour la location de l'user dans la bdd

  // cet url  : https://data.opendatasoft.com/api/v2/catalog/datasets/osm-fr-bars%40babel/records?limit=100&offset=0&lang=fr&timezone=UTC

  // ou : https://data.opendatasoft.com/api/v2/catalog/datasets/osm-fr-bars%40babel/exports/json?limit=-1&offset=0&lang=fr&timezone=UTC  MAIS RENVOI UN file

  const {
    isLoading,
    isError,
    data: loggedUser,
    error,
  } = useQuery({
    queryKey: ["LoggedUser"],
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
    data: listBars,
    isError: isErrorListBars,
    isLoading: isLoadingListBars,
    error: errorListBars,
  } = useQuery({
    queryKey: ["listBars"],
    enabled: !isLoading && location[0] !== null,
    queryFn: async () => {
      let urlBars = new URL(
        "https://data.opendatasoft.com/api/v2/catalog/datasets/osm-fr-bars%40babel/exports/json?"
      );

      const coordinates = location[1].toString() + " " + location[0].toString();

      urlBars.searchParams.append(
        "where",
        `distance(geo_point_2d,geom'POINT(${coordinates})',75km)`
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
  });

  const userSetLocation = useMutation({
    mutationKey: "userSetLocation",
    enabled: !isLoading && !loggedUser,
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
          // if (!toast.isActive(idSaveToast)) {
          //   toast({
          //     id: idSaveToast,
          //     title: "Position enregistrée",
          //     description: "Votre position a bien été enregistrée",
          //     status: "success",
          //   });
          // }
          res.json();
        })
        .catch((err) => {
          return err;
        });
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation([position.coords.latitude, position.coords.longitude]);
      userSetLocation.mutate(
        `${position.coords.latitude},${position.coords.longitude}`
      );
    });
  }, []);

  const MapWithNoSSR = dynamic(
    () => import("../components/layout/map/MapComponent"),
    {
      ssr: false,
    }
  );

  return (
    <>
      {isLoading || isLoadingListBars ? (
        <LoadingPage />
      ) : isError || isErrorListBars ? (
        <ErrorPage />
      ) : (
        <>
          <Navbar />
          <MapWithNoSSR
            location={location}
            loggedUser={loggedUser}
            listBars={listBars}
          />
        </>
      )}
    </>
  );
}
