import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

export default function HomeHero() {

  return (
      <Flex bg={'#FAF9FF'} px={150} minH={'100vh'} align={'center'}
            justify={'center'}>
        <Flex gap={10}>
          <LeftSide/>
          <RightSide/>
        </Flex>
      </Flex>
  );
}

const LeftSide = () => (
    <Flex justify={'center'} direction={'column'} flexBasis={'100%'}>
      <Heading mb={'2.5rem'}>Prêt(e) à trouver votre âme sœur ?</Heading>
      <Text mb={'2rem'}>Notre site de rencontre vous offre la possibilité de
        rencontrer des personnes intéressantes et de trouver l&apos;amour.
        Inscrivez-vous dès maintenant pour découvrir toutes nos fonctionnalités
        !
      </Text>
      <ButtonGroup>
        <Button colorScheme={'purple'}>S&apos;inscrire</Button>
      </ButtonGroup>
    </Flex>
);

const RightSide = () => (
    <Box flexBasis={'100%'}>
      <Image borderRadius={20} boxShadow={'lg'} src={'/couple_img.jpg'}
             alt="happy couple"/>
    </Box>
);