import {Text} from '@chakra-ui/react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const {data: session, status} = useSession();
  if (status === "unauthenticated") router.push("/login");

  return (
      <Text>Dashboard de {session.user.firstName} {session.user.lastName}</Text>
  )
}