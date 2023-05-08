import Head from 'next/head';
import {websiteName} from '@/lib/constants';
import {useSession} from 'next-auth/react';
import LoadingPage from '@/components/LoadingPage';
import GettingStartForm from '@/components/form/GettingStartForm/GettingStartForm';
import {store} from '@/redux/redux';
import {Provider} from 'react-redux';
import {User} from '@prisma/client';

export default function GettingStart() {
  const {data: session, status} = useSession({required: true});

  if (status === 'loading') return <LoadingPage/>;
  return (
      <>
        <Head><title>{websiteName}</title></Head>
        <Provider store={store}>
          <GettingStartForm user={session.user as User}/>
        </Provider>
      </>
  );
}