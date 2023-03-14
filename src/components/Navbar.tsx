import { Box, Flex, Text, ButtonGroup, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const redirect_connexion = () => {
    router.push("/login");
  };

  const redirect_inscription = () => {
    router.push("/register");
  };

  const LeftContent = () => (
    <Box flexBasis={"100%"}>
      <Text>Logo</Text>
    </Box>
  );

  const CenterContent = () => (
    <Flex gap={5} justify={"center"} flexBasis={"100%"}>
      <Text>A propos</Text>
      <Text>Contact</Text>
      <Text>Aide</Text>
    </Flex>
  );

  const RightContent = () => (
    <Flex justify={"right"} flexBasis={"100%"}>
      <ButtonGroup>
        <Button onClick={redirect_inscription}>Inscription</Button>
        <Button colorScheme={"purple"} onClick={redirect_connexion}>
          Connexion
        </Button>
      </ButtonGroup>
    </Flex>
  );

  return (
    <Box
      position={"fixed"}
      zIndex={9999}
      top={0}
      width={"100vw"}
      backdropFilter={"auto"}
      backdropBlur={"20px"}
      px={10}
      py={2}
    >
      <Flex align={"center"}>
        <LeftContent />
        <CenterContent />
        <RightContent />
      </Flex>
    </Box>
  );
}
