import {Chat, User} from '@prisma/client';
import ChatListItem from '@/components/chat/ChatListItem';
import {useEffect, useState} from 'react';
import {Stack, StackDivider} from '@chakra-ui/react';

type Props = {
  user: User
}

export default function ChatList({user}: Props) {
  const [chats, setChats] = useState<(Chat & { User: User[] })[]>([]);

  useEffect(() => {
    fetch(`/api/chats?where=${JSON.stringify(
        {id: {'$in': user.ChatID}})}&include=User`)
        .then(res => res.json())
        .then(data => setChats(data))
        .catch(err => console.error(err));
  }, []);

  return (
      <Stack divider={<StackDivider/>} spacing={2}>
        {chats.map(
            (chat: Chat & { User: User[] }, index: number) =>
                <ChatListItem key={index} chat={chat} user={user}/>)
        }
      </Stack>
  );
}