import {Box, Flex, Text} from '@chakra-ui/react';

import dynamic from 'next/dynamic';

const MapBarWithNoSSR = dynamic(() => import('./MapBar'), {
  ssr: false,
});

type Props = {
  align: 'left' | 'right';
  point: {
    lon: string;
    lat: string;
    name: string;
  };
};

export default function MessageMap({align, point}: Props) {
  const {lon, lat, name} = point;
  return (
      <Flex justifyContent={align}>
        <Box w={'50%'} bg={'purple.500'} borderRadius={10} p={2}>
          <MapBarWithNoSSR lon={lon} lat={lat} name={name}/>
          {/*<Text align={align}>{lon}, {lat}, {name}</Text>*/}
        </Box>
      </Flex>
  );
}
