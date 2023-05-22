import {Avatar, Flex, Text} from '@chakra-ui/react';
import type {Message as MessageType, User} from '@prisma/client';

type Props = {
  align: 'left' | 'right'
  message: MessageType,
  user?: User
}

const MessageText = ({message, align, user}: Props) => (

    <Flex justifyContent={align} gap={2}>
      {user && align === "left" && <Avatar src={`/${user.images[0]}`} name={`${user.firstName} ${user.lastName}`}/>}
      <Text maxW={'70%'} w={'fit-content'} bg={'purple.500'} borderRadius={10}
            color={'white'} px={'10px'} py={'5px'}>
        {message.text}
      </Text>
      {user && align === "right" && <Avatar src={`/${user.images[0]}`} name={`${user.firstName} ${user.lastName}`}/>}
    </Flex>
);

export default MessageText;