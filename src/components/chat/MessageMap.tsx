import { Box, Text } from "@chakra-ui/react";

import dynamic from "next/dynamic";

const MapBarWithNoSSR = dynamic(() => import("./MapBar"), {
  ssr: false,
});

type Props = {
  align: "left" | "right";
  point: {
    lon: string;
    lat: string;
    name: string;
  };
};

export default function MessageMap({ align, point }: Props) {
  const { lon, lat, name } = point;
  return (
    <Box>
      <MapBarWithNoSSR
        lon={lon}
        lat={lat}
        name={name}
        align={align}
      ></MapBarWithNoSSR>
      <Text align={align}>
        {lon}, {lat}, {name}
      </Text>
    </Box>
  );
}
