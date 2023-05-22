import Head from "next/head";
import Navbar from "@/components/Navbar";

import BarChart from "@/components/graph/BarChart";
import PieChart from "@/components/graph/PieChart";
import LineChart from "@/components/graph/LineChart";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Item,
  Stat,
  Text,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Divider,
} from "@chakra-ui/react";
import LeftPanelButton from "@/components/layout/dashboard/left_panel/LeftPanelButton";
import { AiFillMessage } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaMapMarkedAlt } from "react-icons/fa";

import { useRouter } from "next/router";

import { websiteName } from "@/lib/constants";

import { useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "@/models/auth/Session";
import { NotificationType, Role } from "@prisma/client";
import { cp } from "fs";

export default function Graphique() {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const { data: matches } = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      return fetch(
        `/api/notifications/?where={"type": "${NotificationType.NEW_MATCH}"}`
      )
        .then((res) => res.json())
        .catch((err) => {
          return err;
        });
    },
  });

  const { data: userData } = useQuery({
    queryKey: ["matchesUser"],
    enabled: status === "authenticated",
    queryFn: async () => {
      const { user } = session as unknown as Session;
      return fetch(`/api/users/${user.id}?include=Notification,Message`)
        .then((res) => res.json())
        .catch((err) => {
          return err;
        });
    },
  });

  console.log(userData);

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      return fetch(`/api/messages/`)
        .then((res) => res.json())
        .catch((err) => {
          return err;
        });
    },
  });

  return (
    <>
      <Grid
        templateColumns={"repeat(5, 1fr)"}
        templateRows={"repeat(2, 1fr)"}
        gap={5}
        minH={"100vh"}
      >
        <GridItem
          area={"1 / 1 / 3 / 2"}
          width={"20vw"}
          height={"100%"}
          borderRadius={0}
          padding={"0px"}
          bg={"#faf9ff"}
        >
          <Flex direction={"column"} height={"100%"} margin={"10%"}>
            <Flex
              gap={2}
              direction={"column"}
              mt={"1vh"}
              spacing={3.5}
              alignContent={"bottom"}
            >
              <LeftPanelButton
                leftIcon={<AiFillHome />}
                onClickHandler={() => router.push("/dashboard")}
              >
                Accueil
              </LeftPanelButton>

              <LeftPanelButton
                leftIcon={<FaMapMarkedAlt />}
                onClickHandler={() => router.push("/map")}
              >
                Carte
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
        </GridItem>
        <GridItem area={"1 / 2 / 3 / 5"}>
          <Box py={5} margin={"20px"} align={"center"}>
            <Box py={5}>
              <Text align={"center"} color={"#805AD5"} fontSize={"1.5rem"}>
                Bénéfices
              </Text>
            </Box>
            <Stat>
              <StatLabel>Recette dus aux abonnements </StatLabel>
              <StatNumber>0.00€</StatNumber>
              <StatHelpText>
                <StatArrow type={"increase"} />
                0% Mai 2022 - Mai 2023
              </StatHelpText>
            </Stat>

            <Box py={10}>
              <Text align={"center"} color={"#805AD5"} fontSize={"1.5rem"}>
                Infos des échanges de touts les utilisateurs
              </Text>
            </Box>
            <StatGroup>
              <Stat>
                <StatLabel>Messages envoyés</StatLabel>
                <StatNumber>
                  {Boolean(messages) ? messages.length : "-"}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel> Matchs </StatLabel>
                <StatNumber>
                  {Boolean(matches) ? matches.length / 2 : "-"}
                </StatNumber>
              </Stat>
            </StatGroup>
            <Box py={10}>
              <Text align={"center"} color={"#805AD5"} fontSize={"1.5rem"}>
                {Boolean(userData)
                  ? `Infos des échanges de ${userData?.firstName} ${userData?.lastName}`
                  : "Infos des échanges de l'utilisateur"}
              </Text>
            </Box>
            <StatGroup mb={5}>
              <Stat>
                <StatLabel>Messages envoyés</StatLabel>
                <StatNumber>
                  {Boolean(userData) ? userData.Message.length : "-"}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel> Matchs </StatLabel>
                <StatNumber>
                  {Boolean(userData)
                    ? userData.Notification.filter((notif) => {
                        return notif.type === NotificationType.NEW_MATCH;
                      }).length
                    : "-"}
                </StatNumber>
              </Stat>
            </StatGroup>

            <Box>
              <Text align={"center"} color={"#805AD5"} fontSize={"2rem"}>
                Date de création des comptes depuis l'ouverture.
              </Text>
              <BarChart />
            </Box>
          </Box>
        </GridItem>
        <GridItem area={"1 / 5 / 3 / 6"} bg={"#805AD5"} borderRadius={20}>
          <Box py={5}>
            <Text align={"center"} color={"#FAF9FF"} fontSize={"2rem"}>
              Proportion du genre des utilisateurs.
            </Text>
            <Box py={20} bg={"#FAF9FF"} borderRadius={20} margin={"5px"}>
              <PieChart />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
