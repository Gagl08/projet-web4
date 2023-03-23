import {
  Card,
  Flex,
  Box,
  Image,
  Text,
  Button,
  VStack,
  Spacer,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {AiFillMessage} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
import LeftPanelButton
  from '@/components/layout/dashboard/left_panel/LeftPanelButton';

export default function LeftPanel(props) {
  const router = useRouter();
  const {user} = props;

  return (
    <Card width={'20vw'} height={'100vh'} padding={'0px'}>
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
        </Flex>
      </Flex>
    </Card>
  );
}
