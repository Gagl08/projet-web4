import type {Message as MessageType, User} from '@prisma/client';
import Message from '@/components/chat/Message';
import {Flex, Box} from '@chakra-ui/react';

type Props = {
  user: User,
  messages: MessageType[]
}

const MessageList = ({messages, user}: Props) => {
  return (
      <Box w={'70vh'} overflow={'scroll'}>
        <Flex direction={'column'} gap={1} justifyContent={'flex-end'}>
          {messages.map((message, index) => <Message
              align={user.id === message.UserID ? 'right' : 'left'} key={index}
              message={message}/>,
          )}
        </Flex>
      </Box>
  );
};

export default MessageList;