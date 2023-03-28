import {Container, Flex, Text} from '@chakra-ui/react';
import Head from 'next/head';
import {websiteName} from '@/lib/constants';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import Message from '@/components/Message';

export default function Chat() {
  const router = useRouter();
  const {data: session, status} = useSession();
  const {id} = router.query;

  useEffect(() => {
    switch (status) {
      case 'loading':
        return;
      case 'unauthenticated':
        return router.push('/login');
      case 'authenticated':
        fetch(`/api/chats/${id}`).then(res => res.json()).then(chat => {
          if (!chat.UserID.contain(session?.user?.id)) router.push('/login');
        });
        return;
    }
  }, [status]);

  if (status === "loading") return <Text>Loading...</Text>

  const messages = [
    {sender: "me", message: "salut"},
    {sender: "other", message: "salut"},
    {sender: "me", message: "salut"},
    {sender: "other", message: "salut"},
    {sender: "me", message: "salut"},
    {sender: "other", message: "salut"},
  ]

  return (
      <>
        <Head><title>{websiteName}</title></Head>

        <Container>
          <Flex direction={'column'}>
            {
              messages.map(m => <Message sender={m.sender} message={m.message}/>)
            }
          </Flex>

          <Text>Hello World {session?.user?.firstName ?? ""}</Text>
        </Container>
      </>
  );
}