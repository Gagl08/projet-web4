import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Text, useToast } from "@chakra-ui/react";
import MarkerClusterGroup from "@christopherpickering/react-leaflet-markercluster";
import L from "leaflet";

import "@christopherpickering/react-leaflet-markercluster/dist/styles.min.css";

import MarkerBar from "./MarkerBar";
import "leaflet/dist/leaflet.css";

export default function MapComponent(props: any) {
  const { location, listBars } = props;

  const toast = useToast({ position: "bottom" });

  const idToastError = "error_location";

  const userIcon = new L.Icon({
    iconUrl: "logo.svg",
    iconSize: [35, 35],
  });

  return (
    <>
      {location[0] === null || location[1] === null ? (
        <>
          {!toast.isActive(idToastError) &&
            toast({
              title: "Erreur",
              id: idToastError,
              description: "Veuillez autoriser la localisation",
              status: "error",
              isClosable: false,
              duration: 100000,
            })}
          <Text color="purple.500" fontSize="2xl" fontWeight="bold">
            Veuillez autoriser la localisation
          </Text>
        </>
      ) : (
        <MapContainer
          center={location}
          zoom={13}
          minZoom={6}
          zoomControl={false}
          style={{ width: "100vw", height: "100vw" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Pour le user */}
          <Marker icon={userIcon} position={location}></Marker>

          <MarkerClusterGroup chunkedLoading showCoverageOnHover={false}>
            {listBars?.map?.((bar: any, index: number) => (
              <MarkerBar key={index} bar={bar} />
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      )}
    </>
  );
}
