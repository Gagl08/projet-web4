import type {Message as MessageType, User} from '@prisma/client';
import Message from '@/components/chat/Message';
import {Flex} from '@chakra-ui/react';

type Props = {
  user: User,
  messages: MessageType[]
}

const MessageList = ({messages, user}: Props) => {
  return (
      <Flex direction={'column'} gap={1}>
        {messages.map((message, index) => <Message
            align={user.id === message.UserID ? 'right' : 'left'} key={index}
            message={message}/>
        )}
      </Flex>
  );
};

export default MessageList;