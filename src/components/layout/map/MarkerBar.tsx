import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import ModalInviteBar from "./ModalInviteBar";
import L, { LatLngTuple } from "leaflet";

export default function MarkerBar(props: any) {
  const { bar } = props;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const barIcon = new L.Icon({
    iconUrl: "drink_cocktail.png",
    iconSize: [35, 35],
    popupAnchor: [0, -5],
    backgroundColor: "purple",
  });

  const location = [bar.geo_point_2d.lat, bar.geo_point_2d.lon] as LatLngTuple;

  return (
    <Marker icon={barIcon} position={location}>
      <Popup>
        <Box align={"center"}>
          <Text fontSize={"1rem"} fontWeight={"bold"} align={"center"}>
            {bar.name}
          </Text>
          <Button variant={"outline"} onClick={onOpen}>
            Inviter un match
          </Button>
          <ModalInviteBar bar={bar} isOpen={isOpen} onClose={onClose} />
        </Box>
      </Popup>
    </Marker>
  );
}
