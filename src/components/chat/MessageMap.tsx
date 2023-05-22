import {Avatar, Box, Flex, Text} from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import {User} from '@prisma/client';

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
  user?: User
};

export default function MessageMap({align, point, user}: Props) {
  const {lon, lat, name} = point;
  return (
      <Flex justifyContent={align} gap={2}>
        {user && align === "left" && <Avatar src={`/${user.images[0]}`} name={`${user.firstName} ${user.lastName}`}/>}
        <Box w={'50%'} bg={'purple.500'} borderRadius={10} p={2}>
          <MapBarWithNoSSR lon={lon} lat={lat} name={name}/>
        </Box>
        {user && align === "right" && <Avatar src={`/${user.images[0]}`} name={`${user.firstName} ${user.lastName}`}/>}
      </Flex>
  );
}
