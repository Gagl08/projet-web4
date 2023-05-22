import type {Message as MessageType, User, Chat} from '@prisma/client';
import Message from '@/components/chat/Message';
import {Flex} from '@chakra-ui/react';

type Props = {
  user: User,
  messages: MessageType[]
  chat: Chat & { User: User[] }
}

const MessageList = ({messages, user, chat}: Props) => {
  if (chat?.User)
    return (
        <Flex direction={'column'} gap={1} justifyContent={'flex-end'}>
          {messages.map((message, index) =>
              <Message user={chat.User.find(u => u.id === message.UserID)}
                       align={user.id === message.UserID ? 'right' : 'left'}
                       key={index} message={message}/>,
          )}
        </Flex>
    );
};

export default MessageList;