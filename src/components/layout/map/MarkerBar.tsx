import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button, Text } from "@chakra-ui/react";

export default function MarkerBar(props) {
  const { bar } = props;

  //changer l'icon
  const barIcon = new L.Icon({
    iconUrl: "drink_cocktail.png",
    iconSize: [35, 35],
    popupAnchor: [0, -5],
    backgroundColor: "purple",
  });

  const location = [bar.geo_point_2d.lat, bar.geo_point_2d.lon];

  //mettre un tooltip...
  return (
    <Marker icon={barIcon} position={location}>
      <Popup>
        <Box alignItems={"center"}>
          <Text fontSize={"1rem"} fontWeight={"bold"} align={"center"}>
            {bar.name || '"Nom du bar"'}
          </Text>
          <Button variant={"outline"}>Inviter un match</Button>
        </Box>
      </Popup>
    </Marker>
  );
}
