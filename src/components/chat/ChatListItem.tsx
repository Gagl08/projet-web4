import {Chat, User} from '@prisma/client';
import {Avatar, Box, Flex, Text} from '@chakra-ui/react';
import {useRouter} from 'next/router';

type Props = {
  user: User,
  chat: Chat & { User: User[] }
};

export default function ChatListItem({user, chat}: Props) {
  const router = useRouter();
  const otherUser = chat.User.find((u: User) => u.id !== user.id) as User;

  return (
      <Flex alignItems={"center"} gap={5} cursor={'pointer'} onClick={() => router.push(`/chat/${chat.id}`)}>
        <Avatar borderRadius={'full'} boxSize="50px" name={`${otherUser.firstName} ${otherUser.lastName}`} src={otherUser.images[0] ?? ''}/>
        <Box>
          <Text>{otherUser.firstName} {otherUser.lastName}</Text>
        </Box>
      </Flex>
  );
}