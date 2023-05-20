import {useSession} from 'next-auth/react';
import ChatList from '@/components/chat/ChatList';
import LoadingPage from '@/components/LoadingPage';
import {User} from '@prisma/client';

export default function Chat() {
  const {data: session, status} = useSession({required: true});

  if (status === 'loading') return <LoadingPage/>;
  if (session)
    return (
        <ChatList user={session.user as User}/>
    );
}