import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';

export default function HeroBanner() {
  const router = useRouter();

  return (
      <Flex bg={'#FAF9FF'} p={150} minH={{base: 'unset', md: '100vh'}}
            align={'center'} justify={'center'}>
        <Flex gap={10}>

          <Flex justify={'center'} direction={'column'} flexBasis={'100%'}>
            <Heading mb={'2.5rem'}>Prêt(e) à trouver votre âme sœur ?</Heading>
            <Text mb={'2rem'} maxW={{md: '500px'}}>
              Notre site de rencontre vous offre la possibilité de rencontrer
              des personnes intéressantes et de trouver l&apos;amour.
              Inscrivez-vous
              dès maintenant pour découvrir toutes nos fonctionnalités !
            </Text>
            <ButtonGroup>
              <Button onClick={() => router.push('/register')}>
                S&apos;inscrire
              </Button>
            </ButtonGroup>
          </Flex>


          <Box flexBasis={'100%'} display={{base: 'none', md: 'block'}}>
            <Image borderRadius={20} boxShadow={'lg'} src={'/couple_img.jpg'}
                   alt="happy couple"/>
          </Box>
        </Flex>
      </Flex>
  );
}
