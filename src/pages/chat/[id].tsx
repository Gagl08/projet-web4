import {
  Box,
  Container,
  Flex,
  FormControl,
  IconButton,
  Input,
} from '@chakra-ui/react';
import Head from 'next/head';
import {websiteName} from '@/lib/constants';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';

import MessageList from '@/components/chat/MessageList';

import {io, Socket} from 'socket.io-client';
import {Message, User} from '@prisma/client';
import LoadingPage from '@/components/LoadingPage';
import Navbar from '@/components/Navbar';
import {ArrowForwardIcon, CalendarIcon} from '@chakra-ui/icons';

export default function ChatId() {
  const router = useRouter();
  const {data: session, status} = useSession({required: true});
  const {id: chatId} = router.query;

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (status === 'authenticated') socketInitializer();
  }, [status]);

  const socketInitializer = () => {
    fetch(`/api/socket/chat/${chatId}`)
        .then(() => {
          const soc = io();

          soc.on('connect', () => console.log('connected'));
          soc.on('allOldMessages',
              (allOldMessages: Message[]) => setMessages(allOldMessages));
          soc.on('newIncomingMessage',
              (newIncomingMessage: Message) => setMessages(
                  messages => [...messages, newIncomingMessage]));
          setSocket(soc);
        });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (text !== '' && socket && session?.user) {
      socket.emit('createdMessage', {text, sender: session.user.id});
      setText('');
    }
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef}/>;
  };

  if (status === 'loading') return <LoadingPage/>;
  return (
      <Box bgColor={'gray.50'}>
        <Head><title>{websiteName}</title></Head>

        <Navbar/>

        <Container pt={20} bgColor={"white"}>
          <MessageList user={session.user as User} messages={messages}/>

          <form onSubmit={handleSubmit}>
            <FormControl>
              <Flex gap={2} py={5} width={"100%"}>
                <Input type={'text'} value={text} flexGrow={"grow"}
                       onChange={evt => setText(evt.target.value)}/>
                <IconButton aria-label={"Map"} onClick={evt => {
                  evt.preventDefault();
                  router.push("/map");
                }} icon={<CalendarIcon/>} variant={"outline"}/>
                <IconButton aria-label={"Envoyer"} variant={"outline"} icon={<ArrowForwardIcon/>} type={"submit"}/>
              </Flex>
            </FormControl>
          </form>
          <AlwaysScrollToBottom/>
        </Container>
      </Box>
  );
}