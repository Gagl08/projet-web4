import Head from 'next/head';
import {websiteName} from '@/lib/constants';
import {useSession} from 'next-auth/react';
import LoadingPage from '@/components/LoadingPage';
import GettingStartForm from '@/components/form/GettingStartForm';

export default function GettingStart() {
  const {data: session, status} = useSession({required: true})

  if (status === "loading") return <LoadingPage/>
  return (
      <>
        <Head><title>{websiteName}</title></Head>
        <GettingStartForm user={session.user}/>
      </>
  )
}