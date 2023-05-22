import {useSession} from 'next-auth/react';
import ChatList from '@/components/chat/ChatList';
import LoadingPage from '@/components/LoadingPage';
import {User} from '@prisma/client';
import {Container} from '@chakra-ui/react';

export default function Chat() {
  const {data: session, status} = useSession({required: true});

  if (status === 'loading') return <LoadingPage/>;
  return <Container>
    <ChatList user={session.user as User}/>
  </Container>;
}