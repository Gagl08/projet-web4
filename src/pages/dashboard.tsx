import {Grid, GridItem, Text, Box} from '@chakra-ui/react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';

import type {Session} from '@/models/data_models/Session';
import CardUser from '../components/layout/dashboard/card_user/CardUser';
import LeftPanel from '../components/layout/dashboard/left_panel/LeftPanel';
import Head from 'next/head';
import {websiteName} from '@/lib/constants';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
  const router = useRouter();
  const {data: session, status} = useSession();

  if (status === 'loading') return <Text>Loading...</Text>;
  if (status === 'unauthenticated') router.push('/login');

  if (status === 'authenticated') {
    const {user} = session as unknown as Session;

    const refinedUser = {
      ...user,
      age: 21,
      aPropos: 'Je suis la personne fictive la plus fictive',
      images: ['135538.webp'],
      passions: ['Sport', 'Voiture', 'Cuisine'],
    };

    return (
        <>
          <Head><title>{websiteName} | Dashboard</title></Head>


          <Grid templateColumns={'repeat(5, 1fr)'}
                templateRows={'repeat(2, 1fr)'} gap={5} minH={'100vh'}>
            <GridItem area={'1 / 1 / 3 / 2'}>
              <LeftPanel user={refinedUser}/>
            </GridItem>
            <GridItem area={'1 / 2 / 3 / 4'}>
              <Box py={3}>
                <CardUser user={refinedUser}/>
              </Box>
            </GridItem>
            <GridItem area={'1 / 4 / 2 / 6'}>
              {/*Right top*/}
            </GridItem>
            <GridItem area={'2 / 4 / 3 / 6'}>
              {/*Right Bottom*/}
            </GridItem>
          </Grid>
        </>
    );
  }
}