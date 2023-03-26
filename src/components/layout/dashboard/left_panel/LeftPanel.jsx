import {
  Card,
  Flex,
  Box,
  Image,
  Text,
  Spacer,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';

import {AiFillMessage} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
import {BiLogOut} from 'react-icons/bi';

import LeftPanelButton
  from '@/components/layout/dashboard/left_panel/LeftPanelButton';
import {signOut} from 'next-auth/react';

export default function LeftPanel(props) {
  const router = useRouter();
  const {user} = props;

  return (
    <Card width={'20vw'} height={'100%'} borderRadius={0} padding={'0px'} bg={'#faf9ff'}>
      <Flex direction={'column'} height={'100%'} margin={'10%'}>
        <Box>
          <Image src={user.images[0]} borderRadius={'1rem'}/>
          <Box mt={'1vh'}>
            <Text fontSize={'1.5rem'} fontWeight={'bold'}>
              {user.firstName} {user.lastName}
            </Text>
            <Text as="i" fontWeight={'bold'}>
              &quot;{user.aPropos}&quot;
            </Text>
          </Box>
        </Box>
        <Spacer/>
        <Flex gap={2} direction={'column'} mt={'1vh'} spacing={3.5}
              alignContent={'bottom'}>

          <LeftPanelButton leftIcon={<AiFillMessage/>}
                           onClickHandler={() => router.push('/dashboard')}>
            Messages
          </LeftPanelButton>
          <LeftPanelButton leftIcon={<BsFillPersonFill/>}
                           onClickHandler={() => router.push('/dashboard')}>
            Profile
          </LeftPanelButton>
          <LeftPanelButton variant={"outline"} leftIcon={<BiLogOut/>}
                           onClickHandler={() => signOut({callbackUrl: "/"})}>
            Deconnexion
          </LeftPanelButton>
        </Flex>
      </Flex>
    </Card>
  );
}
