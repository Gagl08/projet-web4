import { MdError } from "react-icons/md";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function ErrorGeolocation() {
  const router = useRouter();

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bg="gray.100"
    >
      <MdError color="purple.500" size="50%" />
      <Text color="purple.500" fontSize="2xl" fontWeight="bold">
        Veillez à autoriser la géolocalisation
      </Text>
      <Button onClick={() => router.push("/")}>Page d'accueil</Button>
    </VStack>
  );
}
