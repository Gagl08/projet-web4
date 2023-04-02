import type {Message as MessageType, User} from "@prisma/client";
import Message from '@/components/chat/Message';
import {Box, Flex} from '@chakra-ui/react';

type Props = {
  user: User
  messages: MessageType[]
}

export default function MessageList(props: Props) {
  const {messages, user} = props;

  return (
      <Flex direction={'column'} gap={1}>
        {messages.map((message, index) => <Message key={index} user={user} message={message}/>)}
      </Flex>
  );
}