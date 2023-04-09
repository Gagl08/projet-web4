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

export default function CardUser(props) {
  const {
    users,
    loggedUser,
    userLikes,
    setUserLikes,
    userDislikes,
    setUserDislikes,
  } = props;

  const toast = useToast({
    position: "top",
    duration: 2000,
    isClosable: true,
  });
  const [listUsers, setListUsers] = useState(users);

  const likeMutation = useMutation({
    mutationKey: "like",
    mutationFn: async (id) => {
      return fetch(`/api/users/${loggedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserLikesID: [...userLikes, id] }),
      })
        .then((res) => {
          setUserLikes([...userLikes, user.id]);
          toast({
            title: "J'aime",
            description: "Votre action a bien été prise en compte",
            status: "success",
          });
          res.json();
        })
        .catch((err) => {
          return err;
        });
    },
    onError: (err) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        status: "error",
      });
    },
    onSuccess: (data) => {
      toast({
        title: "J'aime",
        description: "Votre action a bien été prise en compte",
        status: "success",
      });
    },
  });

  const dislikeMutation = useMutation({
    mutationKey: "dislike",
    mutationFn: async (id) => {
      return fetch(`/api/users/${loggedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserDislikesID: [...userDislikes, id] }),
      })
        .then((res) => {
          setUserDislikes([...userDislikes, user.id]);
          toast({
            title: "J'aime pas",
            description: "Votre action a bien été prise en compte",
            status: "success",
          });
          res.json();
        })
        .catch((err) => {
          return err;
        });
    },
    onError: (err) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        status: "error",
        duration: 2000,
      });
    },
    onSuccess: (data) => {
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
        .catch((err) => {
          return err;
        });
    },
  });

  const formateDateToAge = (birthdate) => {
    const date = new Date(birthdate);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  if (listUsers.length === 0) {
    return <SearchFailCard />;
  }

  if (likeMutation.isLoading || dislikeMutation.isLoading) {
    return <LoadingPage />;
  }

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
              borderRadius={"1rem"}
              colorScheme={"purple"}
              onClick={() => {
                likeMutation.mutate(listUsers[0].id);
                setListUsers(listUsers.slice(1));
              }}
            >
              <BiHeart />
            </IconButton>
            <IconButton
              borderRadius={"1rem"}
              colorScheme={"purple"}
              variant={"outline"}
              onClick={() => {
                dislikeMutation.mutate(listUsers[0].id);
                setListUsers(listUsers.slice(1));
              }}
            >
              <RxCross1 />
            </IconButton>
          </Flex>
        </Flex>

        <Box mb={"20px"}>
          <Heading size={"sm"} fontWeight={"bold"} mb="0.5rem">
            A propos :
          </Heading>
          <Text as="i">&quot;{listUsers[0].bio}&quot;</Text>
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
