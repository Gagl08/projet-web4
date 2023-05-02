import {Flex, Text} from '@chakra-ui/react';
import type {Message as MessageType, User} from '@prisma/client';

type Props = {
  align: "left" | 'right'
  message: MessageType
}

const Message = ({message, align}: Props) => (
    <Flex justifyContent={align}>
      <Text w={'fit-content'} bg={'purple.500'} borderRadius={'full'}
            color={'white'} px={'10px'} py={'5px'}>
        {message.text}
      </Text>
    </Flex>
);

export default Message;