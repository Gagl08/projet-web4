import { Grid, GridItem, Text, Box, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import type { Session } from "@/models/auth/Session";
import CardUser from "../components/layout/dashboard/card_user/CardUser";
import SearchFailCard from "../components/layout/dashboard/card_user/SearchFailCard";

import LeftPanel from "../components/layout/dashboard/left_panel/LeftPanel";
import Head from "next/head";
import { websiteName } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "@/components/LoadingPage";

export default function Dashboard() {
  const router = useRouter();
  const toast = useToast({ position: "top", isClosable: true });
  const [userLikes, setUserLikes] = useState();
  const [userDislikes, setUserDislikes] = useState();

  const { data: session, status } = useSession();

  const {
    isLoading,
    isError,
    data: loggedUser,
    error,
  } = useQuery({
    queryKey: ["LoggedUser"],
    enabled: status === "authenticated",
    queryFn: async () => {
      const { user } = session as unknown as Session;

      setUserDislikes([...user.UserDislikesID]);
      setUserLikes([...user.UserLikesID]);

      return fetch(`/api/users/${user.id}`)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          return err;
        });
    },
  });

  const {
    data: listUsers,
    isError: isErrorListUsers,
    isLoading: isLoadingListUsers,
    error: errorListUsers,
  } = useQuery({
    queryKey: ["ListUsers"],
    enabled: status === "authenticated" && !isLoading,
    queryFn: async () => {
      return fetch(
        `/api/user/userDashboard?preference=${loggedUser.gender}&excludedId=${loggedUser.id}&userLikes=${loggedUser.UserLikesID}&userDislikes=${loggedUser.UserDislikesID}`
      ) //exclure les profils déjà like ou dislike
        .then((res) => res.json())
        .catch((err) => {
          return err;
        });
    },
  });

  if (isLoading) {
    if (status === "unauthenticated") router.push("/login");
    return <LoadingPage />;
  }

  if (isError) {
    toast({
      title: `Erreur lors de la récupération des données du profil`,
      status: "error",
      position: "top",
    });
    if (status === "unauthenticated") router.push("/");
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Head>
        <title>{websiteName} | Dashboard</title>
      </Head>

      <Grid
        templateColumns={"repeat(5, 1fr)"}
        templateRows={"repeat(2, 1fr)"}
        gap={5}
        minH={"100vh"}
      >
        <GridItem area={"1 / 1 / 3 / 2"}>
          <LeftPanel user={loggedUser} />
        </GridItem>
        <GridItem area={"1 / 2 / 3 / 4"}>
          <Box py={3}>
            {isLoadingListUsers ? (
              <LoadingPage />
            ) : isErrorListUsers ||
              listUsers.users === undefined ||
              listUsers.users.length === 0 ? (
              <SearchFailCard />
            ) : (
              // dans cardUser, mettre une liste de user, utiliser le user[0] et quand like ou dislike, supprimer le user[0] de la liste
              <CardUser
                users={listUsers.users}
                loggedUser={loggedUser}
                userLikes={userLikes}
                setUserLikes={setUserLikes}
                userDislikes={userDislikes}
                setUserDislikes={setUserDislikes}
              />
            )}
          </Box>
        </GridItem>
        <GridItem area={"1 / 4 / 2 / 6"}>{/*Right top*/}</GridItem>
        <GridItem area={"2 / 4 / 3 / 6"}>{/*Right Bottom*/}</GridItem>
      </Grid>
    </>
  );
}
