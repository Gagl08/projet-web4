import {Box, Flex, Text} from '@chakra-ui/react';
import type {Message as MessageType, User} from "@prisma/client"


type Props = {
  user: User
  message: MessageType
}

export default function Message(props: Props) {
  const {message, user} = props;

  return (
      <Flex justifyContent={user.id === message.UserID ? 'right' : 'left'}>
        <Text w={'fit-content'} bg={'purple.500'} borderRadius={'full'} color={'white'} px={"10px"} py={"5px"}>{message.text}</Text>
      </Flex>
  );
}