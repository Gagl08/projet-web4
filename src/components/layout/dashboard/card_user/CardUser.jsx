import {
  Card,
  Flex,
  Text,
  CardBody,
  IconButton,
  Heading,
  Box,
  CardHeader,
} from "@chakra-ui/react";
import Carousel from "../../../Carousel";
import { BiHeart } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import PassionTagList from "@/components/layout/dashboard/card_user/PassionTagList";
import { useState } from "react";

export default function CardUser(props) {
  const { user, loggedUser, userLiked, setLiked, userDisliked, setDisliked } =
    props;

  const [hidden, setHidden] = useState(false);

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

  return (
    <Card
      // position={"absolute"}
      w={"100%"}
      h={"100%"}
      borderRadius={"1rem"}
      overflow={"hidden"}
      hidden={hidden}
    >
      <CardHeader>
        <Carousel borderRadius={"1rem"} images={user.images} />
      </CardHeader>

      <CardBody>
        <Flex justify={"space-between"} mb={"20px"}>
          <Heading fontSize={"1.5rem"} fontWeight={"bold"} flexBasis={"70%"}>
            {user.firstName} {user.lastName}, {formateDateToAge(user.birthdate)}{" "}
            ans
          </Heading>

          <Flex gap={1}>
            <IconButton
              borderRadius={"1rem"}
              colorScheme={"purple"}
              onClick={() => {
                // setLiked([...userLiked, user.id]);
                setHidden(true);
              }}
            >
              <BiHeart />
            </IconButton>
            <IconButton
              borderRadius={"1rem"}
              colorScheme={"purple"}
              variant={"outline"}
              // onClick={setDisiked([...userDisliked, user.id])}
            >
              <RxCross1 />
            </IconButton>
          </Flex>
        </Flex>

        <Box mb={"20px"}>
          <Heading size={"sm"} fontWeight={"bold"} mb="0.5rem">
            A propos :
          </Heading>
          <Text as="i">&quot;{user.bio}&quot;</Text>
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
              passions={user.PassionID}
              userPassions={loggedUser.PassionID}
              listPassions={listPassions}
            />
          )}
        </Box>
      </CardBody>
    </Card>
  );
}
