import {
  Card,
  Flex,
  Box,
  Image,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { AiFillMessage } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaMapMarkedAlt } from "react-icons/fa";

import LeftPanelButton from "@/components/layout/dashboard/left_panel/LeftPanelButton";
import { signOut } from "next-auth/react";

import { formateDate } from "@/lib/formateDate";

export default function LeftPanel(props) {
  const router = useRouter();
  const { user } = props;

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
          <Image
            src={user.images[0] ?? "/blank_profile_picture.webp"}
            objectFit={"contain"}
            borderRadius={"1rem"}
          />
          <Box mt={"2rem"}>
            <Flex align={"center"} justifyContent="space-between" mb={"1rem"}>
              <Text fontSize={"1.5rem"} fontWeight={"bold"}>
                {user.firstName} {user.lastName}
              </Text>
              <Text fontSize={"1rem"} fontWeight={"bold"}>
                {formateDate(user.birthdate)}
              </Text>
            </Flex>
            <Divider mb={"1rem"} />
            <Text as="i" fontWeight={"bold"}>
              {user.bio && `"${user.bio}"`}
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
            leftIcon={<FaMapMarkedAlt />}
            onClickHandler={() => router.push("/map")}
          >
            Carte
          </LeftPanelButton>

          <LeftPanelButton
            leftIcon={<AiFillMessage />}
            onClickHandler={() => router.push("/chat")}
          >
            Messages
          </LeftPanelButton>

          <LeftPanelButton
            leftIcon={<BsFillPersonFill />}
            onClickHandler={() => router.push("/profile")}
          >
            Profil
          </LeftPanelButton>
          <LeftPanelButton
            variant={"outline"}
            leftIcon={<BiLogOut />}
            onClickHandler={() => signOut({ callbackUrl: "/" })}
          >
            Déconnexion
          </LeftPanelButton>
        </Flex>
      </Flex>
    </Card>
  );
}
