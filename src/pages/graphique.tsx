import Head from "next/head";
import Navbar from "@/components/Navbar";

import BarChart from "@/components/graph/BarChart";
import PieChart from "@/components/graph/PieChart";
import LineChart from "@/components/graph/LineChart";

import { Box } from "@chakra-ui/react";
import { websiteName } from "@/lib/constants";
import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "@/models/auth/Session";
import { Role } from "@prisma/client";
import LoadingPage from '@/components/LoadingPage';

export default function Graphique() {
  const { data: session, status } = useSession({ required: true });
  if (status === 'loading') return <LoadingPage/>

  const { user } = session as unknown as Session;
  return (
    <>
      <Head>
        <title>{websiteName}</title>
      </Head>
      {user.role === Role.ADMIN ? (
        <Box>
          <PieChart />
          <BarChart />
          <LineChart />
        </Box>
      ) : (
        // pour récupérer les notifs d'un user
        //fetch(`/api/users/${user.id}?include=Notification`)
        <></>
      )}
    </>
  );
}
