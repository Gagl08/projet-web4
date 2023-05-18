import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";
import Carousel from "@/components/Carousel";
import { MdWavingHand } from "react-icons/md";
import { formateDate } from "@/lib/formateDate";
import { Notification } from "@prisma/client";
import PassionTagList from "../card_user/PassionTagList";

type modalMatchProps = {
  key: string;
  loggedUser: User;
  notif: Notification;
};

export default function ModalMatch({ notif, loggedUser }: modalMatchProps) {
  const handleClose = () => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationId: notif.id }),
    };
    fetch(`/api/user/consultNotification`, options)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
    onClose: () => {
      handleClose();
    },
  });

  const {
    isLoading,
    isError,
    data: matchedUser,
    error,
  } = useQuery({
    enabled: notif !== undefined,
    queryKey: ["matchUser"],
    queryFn: async () => {
      return fetch(`/api/users/${notif.MatchedUserID}`)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          return err;
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

  return (
    <>
      {matchedUser && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay backdropBlur="2px" />
          <ModalContent>
            <ModalHeader>Vous avez un nouveau match</ModalHeader>
            <ModalBody>
              <Carousel borderRadius={"1rem"} images={matchedUser.images} />
              <Box mt={"2rem"}>
                <Flex
                  align={"center"}
                  justifyContent="space-between"
                  mb={"1rem"}
                >
                  <Text fontSize={"1.5rem"} fontWeight={"bold"}>
                    {matchedUser.firstName} {matchedUser.lastName}
                  </Text>
                  <Text fontSize={"1rem"} fontWeight={"bold"}>
                    {formateDate(matchedUser.birthdate)}
                  </Text>
                </Flex>
                <Divider mb={"1rem"} />
                <Text as="i" fontWeight={"bold"}>
                  &quot;{matchedUser.bio}&quot;
                </Text>
              </Box>
              <Box>
                <Heading size={"sm"} mt={4} fontWeight={"bold"}>
                  Passions :
                </Heading>
                {passionLoading ? (
                  <Text>Chargement des passions...</Text>
                ) : passionIsError ? (
                  <Text>Erreur lors du chargement des passions</Text>
                ) : (
                  <PassionTagList
                    passions={matchedUser.PassionID}
                    userPassions={loggedUser.PassionID}
                    listPassions={listPassions}
                  />
                )}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Flex gap={"1rem"}>
                <Button onClick={onClose}>Fermer</Button>
                <Button
                  leftIcon={<MdWavingHand />}
                  variant={"ghost"}
                  onClick={onClose}
                >
                  Saluer
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
