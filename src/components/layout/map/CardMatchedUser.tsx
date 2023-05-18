import {
  Box,
  Card,
  CardBody,
  chakra,
  Flex,
  GridItem,
  Image,
  Spacer,
  Text,
  useRadio,
} from "@chakra-ui/react";
import { Notification } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type CardMatchedUserProps = {
  notif: Notification;
};

export default function CardMatchedUser({
  notif,
  ...radioProps
}: CardMatchedUserProps) {
  const {
    isLoading,
    isError,
    data: matchedUser,
    error,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["matchUser", notif.MatchedUserID],
    queryFn: async () => {
      return fetch(`/api/users/${notif.MatchedUserID}?include=Chat`)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          return err;
        });
    },
  });

  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio(radioProps);

  return (
    <>
      {!isLoading ? (
        <chakra.label {...htmlProps} cursor="pointer">
          <input {...getInputProps()} hidden />
          <GridItem height={"100%"}>
            <Card
              {...getRadioProps()}
              height={"100%"}
              outline={state.isChecked ? "3px solid" : "none"}
              outlineColor={state.isChecked ? "purple.500" : "none"}
              bg={state.isChecked ? "purple.50" : "white"}
            >
              <CardBody>
                <Flex
                  height={"100%"}
                  direction={"column"}
                  gap={"1rem"}
                  justifyContent={"space-between"}
                  {...getLabelProps()}
                >
                  <Image src={matchedUser.images[0]}></Image>
                  <Text
                    align={"center"}
                    fontSize={"1.5rem"}
                    fontWeight={"bold"}
                  >
                    {matchedUser.firstName} {matchedUser.lastName}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>
        </chakra.label>
      ) : null}
    </>
  );
}
