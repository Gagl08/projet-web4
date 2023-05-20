import {Text} from '@chakra-ui/react';

type Props = {
  align: 'left' | 'right'
  point: {
    lon: string
    lat: string
    name: string
  }
}

export default function MessageMap({align, point}: Props) {
  const {lon, lat, name} = point;
  return <Text align={align}>{lon}, {lat}, {name}</Text>;
}