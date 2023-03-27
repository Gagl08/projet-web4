import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { Session } from "@/models/auth/Session";
import Carousel from "@/components/Carousel";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { RiEditBoxLine } from "react-icons/ri";
import BottomBar from "@/components/BottomBar";
import ModalModifyImages from "@/components/ModalModifyImages";

import { useState } from "react";

export default function UserProfile() {
  const router = useRouter();
  const toast = useToast();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // faire un model avec toutes les infos de user
  const [userData, setUserData] = useState({});

  if (status === "unauthenticated") router.push("/login");

  if (status === "authenticated") {
    const { user } = session as unknown as Session;

    const saveData = () => {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      };

      setIsLoading(true);

      fetch(`/api/users/${user.id}`, options)
        .then(() => {
          setIsLoading(false);
          toast({
            title: `Modifications effectuées`,
            status: "success",
            isClosable: true,
          });
          router.reload();
        })
        .catch(() => {
          setIsLoading(false);
          toast({
            title: `Erreur lors de l'envoi des modifications`,
            status: "error",
            isClosable: true,
          });
        });
    };

    const formateDate = (dateString: string) => {
      var options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString([], options);
    };

    // const refinedUser = {
    //   // ...user,
    //   firstName: "Jean",
    //   lastName: "Dujardin",
    //   birthdate: formateDate(new Date().toString()),
    //   aPropos: "Je suis la personne fictive la plus fictive",
    //   images: ["135538.webp"],
    //   passions: ["Sport", "Voiture", "Cuisine"],
    // };

    return (
      <Box bgColor={"purple.50"}>
        <Container
          justifyContent={"center"}
          maxWidth={"70rem"}
          mt={"1rem"}
          bgColor={"purple.50"}
        >
          <Flex flexDirection={"column"} alignItems={"center"} gap={"1rem"}>
            <Box width={"50%"}>
              <Carousel images={user.images} borderRadius={"1rem"}></Carousel>
            </Box>
            {/* {modal} */}
            {!userData.images ? (
              <ModalModifyImages
                setUserData={setUserData}
                userData={userData}
                images={user.images}
              />
            ) : (
              <ModalModifyImages
                setUserData={setUserData}
                userData={userData}
                images={userData.images}
              />
            )}
            <Divider />
            <Text align={"center"} as="i" color={"grey"}>
              Modifiez les champs en les selectionnants
            </Text>
            <Box width={"100%"}>
              <Flex justify={"space-between"} mb={"1rem"}>
                <Flex gap={"0.5rem"}>
                  <Text margin={"auto"}>Prénom : </Text>
                  <Editable
                    id={"lastName"}
                    as="b"
                    defaultValue={
                      user.lastName === null || user.lastName === ""
                        ? "Non renseigné"
                        : user.lastName
                    }
                    onSubmit={(value) => {
                      setUserData({ ...userData, lastName: value });
                    }}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Flex>
                <Flex gap={"0.5rem"}>
                  <Text margin={"auto"}>Nom : </Text>
                  <Editable
                    id={"firstName"}
                    as="b"
                    defaultValue={
                      user.firstName === null || user.firstName === ""
                        ? "Non renseigné"
                        : user.firstName
                    }
                    onSubmit={(value) => {
                      setUserData({ ...userData, firstName: value });
                    }}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Flex>
                <Flex gap={"0.5rem"}>
                  <Text margin={"auto"}>Date de naissance : </Text>
                  <Text margin={"auto"} id={"birthdate"} as="b" color={"grey"}>
                    {user.birthdate === null
                      ? "Non renseigné"
                      : formateDate(user.birthdate.toString())}
                  </Text>
                </Flex>
                <Flex gap={"0.5rem"}>
                  <Text>Ville : </Text>
                  <Text id={"location"} as="b" color={"grey"}>
                    {user.location === null || user.location === ""
                      ? "Non renseigné"
                      : user.location}
                  </Text>
                </Flex>
                <Flex>
                  <Text>Adresse mail : </Text>
                  <Text id={"email"} as="b" color={"grey"}>
                    {user.email}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={"0.5rem"}>
                <Text width={"100%"} align={"right"} margin={"auto"}>
                  À propos :
                </Text>
                <Editable
                  id={"bio"}
                  as="b"
                  width={"100%"}
                  defaultValue={
                    user.bio === null || user.bio === ""
                      ? "Non renseigné"
                      : user.bio
                  }
                  onSubmit={(value) => {
                    setUserData({ ...userData, bio: value });
                  }}
                >
                  <EditablePreview />
                  <EditableTextarea />
                </Editable>
              </Flex>
            </Box>
            <BottomBar variant={"fixed"} saveData={saveData} />
          </Flex>
        </Container>
      </Box>
    );
  }
}
