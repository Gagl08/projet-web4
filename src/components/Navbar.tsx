import {Box, Flex, Text, ButtonGroup, Button} from '@chakra-ui/react';

export default function Navbar() {
  return (
      <Box position={'fixed'} zIndex={9999} top={0} width={"100vw"} backdropFilter={'auto'} backdropBlur={'20px'}  px={10} py={2} >
        <Flex align={'center'}>
          <LeftContent/>
          <CenterContent/>
          <RightContent/>
        </Flex>
      </Box>
  );
}

const LeftContent = () => (
    <Box flexBasis={"100%"}>
      <Text>Logo</Text>
    </Box>
);

const CenterContent = () => (
    <Flex gap={5} justify={'center'} flexBasis={"100%"}>
      <Text>A propos</Text>
      <Text>Contact</Text>
      <Text>Aide</Text>
    </Flex>
);

const RightContent = () => (
    <Flex justify={'right'} flexBasis={"100%"}>
      <ButtonGroup>
        <Button>Inscription</Button>
        <Button colorScheme={'purple'}>Connexion</Button>
      </ButtonGroup>
    </Flex>
);