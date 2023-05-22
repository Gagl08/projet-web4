import {
  Card,
  Flex,
  Text,
  CardBody,
  IconButton,
  Heading,
  Box,
  CardHeader,
  useToast,
} from "@chakra-ui/react";
import Carousel from "../../../Carousel";
import { BiHeart } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { useMutation, useQuery } from "@tanstack/react-query";
import PassionTagList from "@/components/layout/dashboard/card_user/PassionTagList";
import { useState } from "react";
import SearchFailCard from "./SearchFailCard";
import LoadingPage from "@/components/LoadingPage";
import { User } from "@prisma/client";

type Props = {
  users: User[];
  loggedUser: User;
  setMatch: any;
  refetchLoggedUser: any;
};

export default function CardUser({
  users,
  loggedUser,
  setMatch,
  refetchLoggedUser,
}: Props) {
  const toast = useToast({
    position: "top",
    duration: 2000,
    isClosable: true,
  });
  const [listUsers, setListUsers] = useState(users);

  const likeMutation = useMutation({
    mutationFn: async (id) => {
      const likePostOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUser: loggedUser.id,
          idUserLiked: id,
        }),
      };

      try {
        const res = await fetch(`/api/user/like`, likePostOptions);
        const response = await res.json();
        return response;
      } catch (err) {
        return err;
      }
    },
    onSuccess: (data) => {
      if (data.error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue",
          status: "error",
        });
        return;
      }
      if (data.match) {
        refetchLoggedUser();
      }
      setListUsers(listUsers.slice(1));
      toast({
        title: "J'aime",
        description: "Votre action a bien été prise en compte",
        status: "success",
      });

      //tester si match et afficher un truc
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async (id) => {
      const dislikePostOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUser: loggedUser.id,
          idUserDisliked: id,
        }),
      };

      try {
        const res = await fetch(`/api/user/dislike`, dislikePostOptions);
        const response = await res.json();
        return response;
      } catch (err) {
        return err;
      }
    },
    onSuccess: (data) => {
      if (data.error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue",
          status: "error",
          duration: 2000,
        });
        return;
      }
      setListUsers(listUsers.slice(1));
      toast({
        title: "J'aime pas",
        description: "Votre action a bien été prise en compte",
        status: "success",
        duration: 2000,
      });
    },
  });

  const {
    isLoading: passionLoading,
    isError: passionIsError,
    data: listPassions,
    error: passionError,
  } = useQuery({
    queryKey: ["passions"],
    queryFn: async () => {
      return fetch(`/api/passions/`)
        .then((res) => res.json())
        .catch((err) => err);
    },
  });

  const formateDateToAge = (birthdate: Date) => {
    const date = new Date(birthdate);
    const ageDifMs = Date.now() - date.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  if (listUsers.length === 0) return <SearchFailCard />;
  if (likeMutation.isLoading || dislikeMutation.isLoading)
    return <LoadingPage />;

  return (
    <Card w={"100%"} h={"100%"} borderRadius={"1rem"} overflow={"hidden"}>
      <CardHeader>
        <Carousel borderRadius={"1rem"} images={listUsers?.[0].images} />
      </CardHeader>

      <CardBody>
        <Flex justify={"space-between"} mb={"20px"}>
          <Heading fontSize={"1.5rem"} fontWeight={"bold"} flexBasis={"70%"}>
            {listUsers[0].firstName} {listUsers[0].lastName},{" "}
            {formateDateToAge(listUsers[0].birthdate)} ans
          </Heading>

          <Flex gap={1}>
            <IconButton
              icon={<BiHeart />}
              aria-label="like"
              borderRadius={"1rem"}
              onClick={() => likeMutation.mutate(listUsers[0].id)}
            />
            <IconButton
              icon={<RxCross1 />}
              aria-label="dislike"
              borderRadius={"1rem"}
              variant={"outline"}
              onClick={() => dislikeMutation.mutate(listUsers[0].id)}
            />
          </Flex>
        </Flex>

        <Box mb={"20px"}>
          <Heading size={"sm"} fontWeight={"bold"} mb="0.5rem">
            A propos :
          </Heading>
          <Text as="i" fontWeight={"bold"}>
            {listUsers[0].bio && `"${listUsers[0].bio}"`}
          </Text>
        </Box>

        <Box>
          <Heading size={"sm"} fontWeight={"bold"}>
            Passions :
          </Heading>
          {passionLoading ? (
            <Text>Chargement des passions...</Text>
          ) : passionIsError ? (
            <Text>Erreur lors du chargement des passions</Text>
          ) : (
            <PassionTagList
              passions={listUsers[0].PassionID}
              userPassions={loggedUser.PassionID}
              listPassions={listPassions}
            />
          )}
        </Box>
      </CardBody>
    </Card>
  );
}
