import { Marker, Popup } from "react-leaflet";
import { Box, Text } from "@chakra-ui/react";
import L from "leaflet";

type SimpleMarkerBarProps = {
  lat: string;
  lon: string;
  name: string;
};

export default function SimpleMarkerBar({lat, lon, name}: SimpleMarkerBarProps) {
  const barIcon = new L.Icon({
    iconUrl: "/drink_cocktail.png",
    iconSize: [35, 35],
    popupAnchor: [0, -5],
    backgroundColor: "purple",
  });

  return (
    <Marker icon={barIcon} position={[Number(lat), Number(lon)]}>
      <Popup>
        <Box align={"center"}>
          <Text fontSize={"1rem"} fontWeight={"bold"} align={"center"}>
            Vous avez été invité au : {name}
          </Text>
        </Box>
      </Popup>
    </Marker>
  );
}
