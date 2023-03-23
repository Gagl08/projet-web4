import {Text} from '@chakra-ui/react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {Flex} from '@chakra-ui/react';

import type {Session} from '@/models/data_models/Session';
import CardUser from "../components/layout/dashboard/card_user/CardUser";
import LeftPanel from "../components/layout/dashboard/left_panel/LeftPanel";
import Head from 'next/head';
import {websiteName} from '@/lib/constants';

export default function Dashboard() {
  const router = useRouter();
  const {data: session, status} = useSession();

  if (status === "loading") return <Text>Loading...</Text>
  if (status === "unauthenticated") router.push("/login");


  if (status === "authenticated") {
    const {user} = session as unknown as Session;

    const refinedUser = {...user,
      age: 21,
      aPropos: "Je suis la personne fictive la plus fictive",
      images: ["135538.webp"],
      passions: ["Sport", "Voiture", "Cuisine"],
    };

    return (
        <>
          <Head><title>{websiteName} | Dashboard</title></Head>

          <Flex gap={10}>
            <LeftPanel user={refinedUser} />
            <Flex justify={'center'} alignItems={'center'} ><CardUser user={refinedUser} /></Flex>
          </Flex>
        </>
    );
  }
}