import {Button} from '@chakra-ui/react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';

export default function Chat() {
  const router = useRouter();
  const {data: session, status} = useSession();

  if (session)
    return (
        <>
          {session.user.ChatID.map(
              (id: string, index: number) => (
                  <Button key={index} onClick={() =>
                      router.push(`/chat/${id}`)}>{id}</Button>
              ),
          )}
        </>
    );
}