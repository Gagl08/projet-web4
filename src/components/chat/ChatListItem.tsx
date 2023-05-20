import {Chat, User} from '@prisma/client';
import {Box, Flex, Image, Text} from '@chakra-ui/react';
import {useRouter} from 'next/router';

type Props = {
  user: User,
  chat: Chat & {User: User[]}
};

export default function ChatListItem({user, chat}: Props) {
  const router = useRouter();
  const otherUser = chat.User.find((u: User) => u.id !== user.id) as User

  console.log(chat);

  return (
      <>
        <Flex cursor={"pointer"} onClick={() => router.push(`/chat/${chat.id}`)}>
          <Image borderRadius={'full'} boxSize='50px' src={otherUser.images[0] ?? "/blank_profile_picture.webp"}/>
          <Box>
            <Text>{otherUser.firstName} {otherUser.lastName}</Text>
          </Box>
        </Flex>
      </>
  );
}