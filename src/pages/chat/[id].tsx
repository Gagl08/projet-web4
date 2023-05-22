import {
  Box, Button,
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
import {Chat, Message, User} from '@prisma/client';
import LoadingPage from '@/components/LoadingPage';
import Navbar from '@/components/Navbar';

import {ArrowForwardIcon} from '@chakra-ui/icons';
import {FaMapMarkedAlt} from 'react-icons/fa';

export default function ChatId() {
  const router = useRouter();
  const {data: session, status} = useSession({required: true});
  const {id: chatId} = router.query;

  const [chatInfo, setChatInfo] = useState<Chat & { User: User[] }>();
  const [otherUser, setOtherUser] = useState<User>()
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const user = session.user as User

      socketInitializer();
      fetch(`/api/chats/${chatId}?include=User`)
          .then(res => res.json())
          .then((chat: Chat & { User: User[] }) => {
            setChatInfo(chat);
            const other = chat.User.find(u => u.id !== user.id);
            setOtherUser(other)
          });
    }
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
    evt.preventDefault();
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

        <Container maxW={'container.md'} pt={20} bgColor={'white'}>
          <MessageList chat={chatInfo} user={session.user as User} messages={messages}/>

          <form onSubmit={handleSubmit}>
            <FormControl>
              <Flex gap={2} py={5} width={'100%'}>
                <Input placeholder={`Écrivez à ${otherUser?.firstName} ${otherUser?.lastName}...`} type={'text'} value={text} flexGrow={'grow'}
                       onChange={evt => setText(evt.target.value)}/>
                <IconButton aria-label={'Map'} onClick={evt => {
                  evt.preventDefault();
                  router.push('/map');
                }} icon={<FaMapMarkedAlt />} variant={'outline'}/>
                <IconButton aria-label={'Envoyer'} variant={'outline'}
                            icon={<ArrowForwardIcon/>} type={'submit'}/>
              </Flex>
            </FormControl>
          </form>
          <AlwaysScrollToBottom/>
        </Container>

        <Button m={3} position={'fixed'} bottom={0} onClick={() => router.push("/dashboard")}>Tableau de bord</Button>
      </Box>
  );
}