import {
  Box,
  Flex,
} from '@chakra-ui/react';
import Head from 'next/head';
import LoginForm from '@/components/form/LoginForm';
import {websiteName} from '@/lib/constants';

export default function Login() {
  return (
      <>
        <Head><title>{websiteName} | Connexion</title></Head>

        <Flex gap={5} h={'100vh'} justify={'center'} alignItems={'center'}>
          <Box flexBasis={'100%'}
               display={{base: 'none', md: 'block'}}
               h={'100%'}
               bgImage={'/couple_horizon.png'}
               bgSize={'cover'}
               bgPos={'center'}
          />
          <LoginForm/>
        </Flex>
      </>
  );
}
