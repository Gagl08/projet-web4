import {Flex} from '@chakra-ui/react';
import {MapContainer, TileLayer} from 'react-leaflet';
import SimpleMarkerBar from './SimpleMarkerBar';
import 'leaflet/dist/leaflet.css';

type MapBarProps = {
  lat: string;
  lon: string;
  name: string;
  align: 'left' | 'right';
};

export default function MapBar({lat, lon, name}: MapBarProps) {
  return (
      <MapContainer
          center={[Number(lat), Number(lon)]}
          zoom={13}
          minZoom={6}
          zoomControl={false}
          style={{width: '100%', height: '20rem'}}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SimpleMarkerBar lat={lat} lon={lon} name={name}/>
      </MapContainer>
  );
}
