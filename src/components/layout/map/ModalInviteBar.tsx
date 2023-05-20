import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useRadio,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import { Notification, NotificationType, User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { Session } from "@/models/auth/Session";
import CardMatchedUser from "./CardMatchedUser";
import { useRouter } from "next/router";

type ModalInviteBarProps = {
  isOpen: boolean;
  onClose: () => void;
  bar: any;
};

export default function ModalInviteBar({
  isOpen,
  onClose,
  bar,
}: ModalInviteBarProps) {
  const { data: session, status } = useSession();
  const toast = useToast();
  const router = useRouter();

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: "-1",
  });

  const inviteToBar = useMutation({
    mutationFn: async (id) => {
      const inviteOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUser: id,
          idUserMatched: value,
          bar: bar,
        }),
      };

      try {
        const res = await fetch(`/api/user/inviteToBar`, inviteOptions);
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
      router.push(`/chat/${data.message_sent.ChatID}`);
    },
  });

  const {
    isLoading,
    isError,
    data: notificationMatch,
    error,
  } = useQuery({
    queryKey: ["notificationMatch"],
    enabled: status === "authenticated",
    queryFn: async () => {
      const { user } = session as unknown as Session;

      return fetch(
        `/api/notifications?where={"$and":{"UserID":"${user.id}", "type":"${NotificationType.NEW_MATCH}"}}`
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          return err;
        });
    },
  });

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        size={"3xl"}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          <ModalHeader display={"flex"} alignItems={"center"} gap={2}>
            Inviter au bar : {bar.name}
            <Box as="span" fontSize={"3xl"}>
              🍻
            </Box>
          </ModalHeader>
          <ModalBody>
            <Grid
              {...getRootProps()}
              templateColumns={`repeat(${notificationMatch?.length}, 50%)`}
              gap={6}
            >
              {!isError && !error ? (
                notificationMatch?.length > 0 ? (
                  notificationMatch?.map((notif: Notification) => {
                    return (
                      <CardMatchedUser
                        key={notif.MatchedUserID}
                        notif={notif}
                        {...getRadioProps({ value: notif.MatchedUserID })}
                      />
                    );
                  })
                ) : (
                  <Text fontSize={"xl"}>Aucun match</Text>
                )
              ) : null}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              isDisabled={value === "-1"}
              onClick={() => {
                const { user } = session as unknown as Session;
                inviteToBar.mutate(user.id);
                onClose();
              }}
            >
              Inviter
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
