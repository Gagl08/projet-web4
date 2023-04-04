import {
  Card,
  Flex,
  Box,
  Image,
  Text,
  Spacer,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { AiFillMessage } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

import LeftPanelButton from "@/components/layout/dashboard/left_panel/LeftPanelButton";
import { signOut } from "next-auth/react";

export default function LeftPanel(props) {
  const router = useRouter();
  const { user } = props;

  const formateDate = (dateString) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString([], options);
  };

  return (
    <Card
      width={"20vw"}
      height={"100%"}
      borderRadius={0}
      padding={"0px"}
      bg={"#faf9ff"}
    >
      <Flex direction={"column"} height={"100%"} margin={"10%"}>
        <Box>
          {user.images.length === 0 ? (
            <Image src={"/blank_profile_picture.webp"} borderRadius={"1rem"} />
          ) : (
            <Image src={user.images[0]} borderRadius={"1rem"} />
          )}
          <Box mt={"2rem"}>
            <Flex align={"center"} justifyContent="space-between" mb={"1rem"}>
              <Text fontSize={"1.5rem"} fontWeight={"bold"}>
                {user.firstName} {user.lastName}
              </Text>
              <Text fontSize={"1rem"} fontWeight={"bold"}>
                {formateDate(user.birthdate)}
              </Text>
            </Flex>
            <Divider colorScheme={"purple"} mb={"1rem"} />
            <Text as="i" fontWeight={"bold"}>
              &quot;{user.bio}&quot;
            </Text>
          </Box>
        </Box>
        <Spacer />
        <Flex
          gap={2}
          direction={"column"}
          mt={"1vh"}
          spacing={3.5}
          alignContent={"bottom"}
        >
          <LeftPanelButton
            leftIcon={<AiFillMessage />}
            onClickHandler={() => router.push("/dashboard")}
          >
            Messages
          </LeftPanelButton>
          <LeftPanelButton
            leftIcon={<BsFillPersonFill />}
            onClickHandler={() => router.push("/userProfile")}
          >
            Profile
          </LeftPanelButton>
          <LeftPanelButton
            variant={"outline"}
            leftIcon={<BiLogOut />}
            onClickHandler={() => signOut({ callbackUrl: "/" })}
          >
            Deconnexion
          </LeftPanelButton>
        </Flex>
      </Flex>
    </Card>
  );
}
