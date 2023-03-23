import {Text} from '@chakra-ui/react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {Flex} from '@chakra-ui/react';

import type {Session} from '@/models/data_models/Session';
import CardUser from "../components/layout/Dashboard/CardUser";
import LeftPanel from "../components/layout/Dashboard/LeftPanel/LeftPanel";

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
        <Flex gap={10}>
          <LeftPanel user={refinedUser} />
          <CardUser user={refinedUser} />
        </Flex>
    );
  }
}