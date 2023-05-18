import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import {useSession} from 'next-auth/react';

import LoadingPage from '@/components/LoadingPage';
import Navbar from '@/components/Navbar';
import {Session} from '@/models/auth/Session';
import ErrorGeoLocation from '@/components/ErrorGeoLocation';

export default function Map() {
  const [location, setLocation] = useState<number[]>([]);
  const [geolocationError, setGeolocationError] = useState(false);
  const {data: session, status} = useSession({required: true});
  const [listBars, setListBars] = useState<any>(null);

  useEffect(() => {
    if (!session?.user) return;

    navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation([position.coords.latitude, position.coords.longitude]);
          setGeolocationError(false);
        },
        () => setGeolocationError(true),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
    );
    if (location[0]) {
      let urlBars = new URL('https://data.opendatasoft.com/api/v2/catalog/datasets/osm-fr-bars%40babel/exports/json');

      const coordinates = `${location[1]} ${location[0]}`;
      const params = {
        where: `distance(geo_point_2d,geom'POINT(${coordinates})',75km)`,
        limit: '-1',
        offset: '0',
        timezone: 'UTC',
      };

      for (const [key, val] of Object.entries(params)) {
        urlBars.searchParams.append(key, val);
      }

      fetch(urlBars)
          .then(res => res.json())
          .then(data => {
            const filteredBars = data.filter((bar: any) => bar.name !== null);
            setListBars(filteredBars);
          })
          .catch(err => console.error(err));
    }
  }, [session?.user]);

  if (status === 'loading') return <LoadingPage/>;
  const {user} = session as unknown as Session;

  const MapWithNoSSR = dynamic(
      () => import('../components/layout/map/MapComponent'),
      {ssr: false},
  );

  if (geolocationError) return <ErrorGeoLocation/>;
  if (!listBars) return <LoadingPage/>;

  return (
      <>
        <Navbar variant={'fixed'}/>
        <MapWithNoSSR
            location={location}
            loggedUser={user}
            listBars={listBars}/>
      </>
  );
}
