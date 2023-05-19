import Head from 'next/head';
import Navbar from '@/components/Navbar';

import BarChart from '@/components/graph/BarChart'
import PieChart from '@/components/graph/PieChart';
import LineChart from '@/components/graph/LineChart';

import {Box} from '@chakra-ui/react';
import {websiteName} from '@/lib/constants';
import { useRef, useEffect } from 'react';

export default function Graphique() {

  return (
      <>
        <Head><title>{websiteName}</title></Head>

        <Box>
            <PieChart/>
            <BarChart/>
            <LineChart />
        </Box>
      </>
  );
}
