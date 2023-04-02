import {Container, Flex, Input, Text} from '@chakra-ui/react';
import Head from 'next/head';
import {websiteName} from '@/lib/constants';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import MessageList from '@/components/chat/MessageList';
import FormMessage from '@/components/form/FormMessage';

export default function ChatId() {
  const router = useRouter();
  const {data: session, status} = useSession();
  const {id} = router.query;
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (status === "authenticated")
    fetch(`/api/messages?where={"ChatID": "${id}"}`)
    .then(res => res.json())
    .then(msgs => setMessages(msgs))
  }, [status]);

  if (status === 'loading') return <Text>Loading...</Text>;

  if (session && messages)
  return (
      <>
        <Head><title>{websiteName}</title></Head>

        <Container>
          <MessageList user={session.user} messages={messages}/>
          <FormMessage user={session.user} chatId={id} />
        </Container>
      </>
  );
}