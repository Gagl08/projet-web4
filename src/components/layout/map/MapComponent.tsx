import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Flex, Text, useToast } from "@chakra-ui/react";
import MarkerClusterGroup from "@christopherpickering/react-leaflet-markercluster";

import "@christopherpickering/react-leaflet-markercluster/dist/styles.min.css";

import MarkerBar from "./MarkerBar";
import "leaflet/dist/leaflet.css";

export default function MapComponent(props) {
  const { location, listBars } = props;

  const toast = useToast({ position: "top" });

  const idToastError = "error_location";

  const userIcon = new L.Icon({
    iconUrl: "logo.svg",
    iconSize: [35, 35],
  });

  return (
    <>
      {location[0] === null || location[1] === null ? (
        <>
          {!toast.isActive(idToastError)
            ? toast({
                title: "Erreur",
                id: idToastError,
                description: "Veuillez autoriser la localisation",
                status: "error",
                isClosable: false,
                duration: 100000,
              })
            : null}
          <Text color="purple.500" fontSize="2xl" fontWeight="bold">
            Veuillez autoriser la localisation
          </Text>
        </>
      ) : (
        <Flex>
          <MapContainer
            center={location}
            zoom={13}
            minZoom={8}
            style={{
              width: "100vw",
              height: "100vw",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Pour le user */}
            <Marker icon={userIcon} position={location}></Marker>

            <MarkerClusterGroup chunkedLoading showCoverageOnHover={false}>
              {listBars.map((bar, index) => {
                return <MarkerBar key={index} bar={bar} />;
              })}
            </MarkerClusterGroup>
          </MapContainer>
        </Flex>
      )}
    </>
  );
}
