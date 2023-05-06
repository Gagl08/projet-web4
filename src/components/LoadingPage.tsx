import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingPage() {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh"
          width="100vw" bg="gray.100">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl"/>
    </Flex>
  );
}
