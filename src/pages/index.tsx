import Head from 'next/head';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/layout/home/HeroBanner';
import HomePresentation from '@/components/layout/home/PresentationSection';
import {websiteName} from '@/lib/constants';


export default function Home() {
  return (
      <>
        <Head><title>{websiteName}</title></Head>

        <Navbar variant={"fixed"}/>
        <HeroBanner/>
        <HomePresentation/>
      </>
  );
}
