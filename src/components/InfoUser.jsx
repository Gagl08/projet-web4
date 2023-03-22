import {
  Card,
  Flex,
  Box,
  Image,
  Text,
  Button,
  Center,
  HStack,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Carousel from "./Carousel";
import { AiFillMessage } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

export default function InfoUser(props) {
  const router = useRouter();
  const { user } = props;
  // const data_user = props;
  const borderRad = "2rem";

  const buttonGenerator = (icon, text, url) => {
    return (
      <Button
        bg={"white"}
        _hover={{ bg: "blackAlpha.100", color: "purple.400" }}
        width={"100%"}
        lineHeight={"auto"}
        justifyContent={"left"}
        onClick={() => router.push(url)}
      >
        <HStack spacing={"1rem"} alignItems={"center"}>
          {icon}
          <Text fontWeight={"bold"} fontSize={"1.2rem"}>
            {text}
          </Text>
        </HStack>
      </Button>
    );
  };

  //changer l'url
  const messageButton = buttonGenerator(
    <AiFillMessage />,
    "Messages",
    "/test_card"
  );

  const profileButton = buttonGenerator(
    <BsFillPersonFill />,
    "Profile",
    "/test_card"
  );

  return (
    <Card
      borderRadius={borderRad}
      width={"20vw"}
      height={"100vh"}
      padding={"0px"}
    >
      <Flex direction={"column"} height={"100%"} margin={"10%"}>
        <Box>
          <Image src={user.images[0]} borderRadius={borderRad} />
          <Box mt={"1vh"}>
            <Text fontSize={"1.5rem"} fontWeight={"bold"}>
              {user.firstName} {user.lastName}
            </Text>
            <Text as={"i"} fontWeight={"bold"}>
              "{user.aPropos}""
            </Text>
          </Box>
        </Box>
        <Spacer />
        <VStack mt={"1vh"} spacing={3.5} alignContent={"bottom"}>
          {messageButton}
          {profileButton}
        </VStack>
      </Flex>
    </Card>
  );
}
