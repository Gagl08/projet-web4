import {Box, Flex, Text, ButtonGroup, Button} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {signOut, useSession} from 'next-auth/react';

export default function Navbar() {
  const router = useRouter();
  const {data: session, status} = useSession();

  const RightSection = () => {

    if (status === "authenticated" && session.user) return (
        <Flex justify={'right'} flexBasis={'100%'}>
          <Text>{session.user.email}</Text>

          <ButtonGroup>
            <Button colorScheme={'purple'} onClick={() => signOut()}>
              Déconnexion
            </Button>
          </ButtonGroup>
        </Flex>
    );
    else return (
        <Flex justify={'right'} flexBasis={'100%'}>
          <ButtonGroup>
            <Button
                onClick={() => router.push('/register')}>Inscription</Button>
            <Button colorScheme={'purple'}
                    onClick={() => router.push('/login')}>
              Connexion
            </Button>
          </ButtonGroup>
        </Flex>
    );
  };

  return (
      <Box position={'fixed'} zIndex={9999} top={0} width={'100vw'}
           backdropFilter={'auto'} backdropBlur={'20px'} px={10} py={2}>
        <Flex align={'center'}>
          <Box flexBasis={'100%'}>
            <Text>Logo</Text>
          </Box>

          <Flex gap={5} justify={'center'} flexBasis={'100%'}>
            <Text>A propos</Text>
            <Text>Contact</Text>
            <Text>Aide</Text>
          </Flex>

          <RightSection/>
        </Flex>
      </Box>
  );

}
