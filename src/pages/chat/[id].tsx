import {Button, Container, Flex, Input, Text} from '@chakra-ui/react';
import Head from 'next/head';
import {websiteName} from '@/lib/constants';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useCallback, useEffect, useState} from 'react';

import MessageList from '@/components/chat/MessageList';

import {io, Socket} from 'socket.io-client';
import {Message} from '@prisma/client';

export default function ChatId() {
  const router = useRouter();
  const {data: session, status} = useSession();
  const {id: chatId} = router.query;

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    if (status === 'authenticated') socketInitializer()
  }, [status]);


  const socketInitializer = async () => {
    await fetch(`/api/socket/chat/${chatId}`)
    const soc = io()

    soc.on('connect', () => {
      console.log('connected')
    })

    soc.on("allOldMessages", (allOldMessages: Message[]) => {
      console.log("allOldMessages", allOldMessages);
      setMessages(allOldMessages);
    })

    soc.on("newIncomingMessage", (newIncomingMessage: Message) => {
      console.log("newIncomingMessage", newIncomingMessage);
      console.log("messages", messages);
      setMessages(messages => ([...messages, newIncomingMessage]));
    });

    setSocket(soc);
  }

  if (status === 'loading') return <Text>Loading...</Text>;

  const handleSubmit = () => {
    if (text !== "" && socket) {
      // @ts-ignore
      socket.emit("createdMessage", {text, sender: session.user.id})
      setText("");
    }
  }

  if (session && session.user && messages)
  return (
      <>
        <Head><title>{websiteName}</title></Head>

        <Container>
          <MessageList user={session.user} messages={messages}/>

          <Flex gap={5} mt={5}>
            <Input type={"text"} colorScheme={'purple'} onChange={(evt) => setText(evt.target.value) } value={text} />
            <Button colorScheme={'purple'} onClick={handleSubmit}>Envoyer</Button>
          </Flex>
        </Container>
      </>
  );
}