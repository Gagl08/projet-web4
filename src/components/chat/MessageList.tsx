import type {Message as MessageType, User} from '@prisma/client';
import Message from '@/components/chat/Message';
import {Box, Flex} from '@chakra-ui/react';

type Props = {
  user: User
  messages: MessageType[]
}

const MessageList = ({messages, user}: Props) => (
    <Flex direction={'column'} gap={1}>
      {messages.map((message, index) =>
          <Message key={index}
                   align={user.id === message.UserID ? 'right' : 'left'}
                   message={message}/>
      )}
    </Flex>
);

export default MessageList;