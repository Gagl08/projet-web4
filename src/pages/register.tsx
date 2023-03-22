import { Box, Flex } from "@chakra-ui/react";
import RegisterForm from "@/components/form/RegisterForm";

export default function Register() {
  return (
    <Box>
      <Flex gap={10} h={"100vh"} alignItems={"center"}>
        <Box
          display={{ base: "none", md: "block" }}
          h={"100%"}
          flexBasis={"100%"}
          bgImage={"/couple_holding_hands.png"}
          bgPos={"center"}
          bgSize={"cover"}
        />
        <RegisterForm />
      </Flex>
    </Box>
  );
}
