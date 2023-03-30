import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { Session } from "@/models/auth/Session";
import Carousel from "@/components/Carousel";
import { Gender } from "@prisma/client";
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
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  useToast,
} from "@chakra-ui/react";

import ModalModifyImages from "@/components/ModalModifyImages";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function UserProfile() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm();

  const [userData, setUserData] = useState({});

  const { data: session, status } = useSession();
  if (status === "unauthenticated") router.push("/login");

  if (status === "authenticated") {
    const { user } = session as unknown as Session;

    const getTextGender = (gender) => {
      switch (gender) {
        case Gender.MALE:
          return "Homme";
        case Gender.FEMALE:
          return "Femme";
        case Gender.OTHER:
          return "Autre";
        case Gender.UNKNOWN:
          return "Non renseigné";
      }
    };

    const saveData = (values: any) => {
      const trueValues = Object.keys(values).reduce((acc, key) => {
        if (values[key] !== "" && values[key] !== undefined) {
          acc[key] = values[key];
        }
        return acc;
      }, {});

      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trueValues),
      };

      if (Object.keys(trueValues).length > 0) {
        setIsLoading(true);
        fetch(`/api/users/${user.id}`, options)
          .then((res) => {
            console.log(res);
            setIsLoading(false);
            toast({
              title: `Modifications effectuées`,
              status: "success",
              isClosable: true,
            });
            // router.reload();
          })
          .catch((err) => {
            setIsLoading(false);
            toast({
              title: `Erreur lors de l'envoi des modifications`,
              status: "error",
              isClosable: true,
            });
            console.log(err);
          });
      }
    };

    const formateDate = (dateString: string) => {
      var options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString([], options);
    };

    return (
      <Box bgColor={"purple.50"}>
        <Container justifyContent={"center"} maxWidth={"70rem"} mt={"1rem"}>
          <Flex flexDirection={"column"} alignItems={"center"} gap={"1rem"}>
            <Box width={"50%"}>
              {userData.images ? (
                <Carousel
                  images={userData.images}
                  borderRadius={"1rem"}
                ></Carousel>
              ) : (
                <Carousel images={user.images} borderRadius={"1rem"}></Carousel>
              )}
            </Box>
            {/* {modal} */}

            {!userData.images ? (
              <ModalModifyImages
                setUserData={setUserData}
                userData={userData}
                user={user}
                images={user.images}
              />
            ) : (
              <ModalModifyImages
                setUserData={setUserData}
                userData={userData}
                user={user}
                images={userData.images}
              />
            )}

            <Divider colorScheme={"purple"} />
            <Text align={"center"} as="i" color={"grey"}>
              Modifiez les champs en les selectionnants
            </Text>

            <form onSubmit={handleSubmit(saveData)}>
              <FormControl width={"100%"}>
                <Flex justify={"space-between"} mb={"1rem"}>
                  <Box>
                    <FormLabel as="legend" htmlFor={"firstName"}>
                      Prénom :
                    </FormLabel>
                    <Controller
                      name={"firstName"}
                      control={control}
                      render={({ field }) => (
                        <Editable
                          {...field}
                          id={"firstName"}
                          placeholder={"Non renseigné"}
                          as={"b"}
                          defaultValue={
                            user.firstName === null ? "" : user.firstName
                          }
                        >
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      )}
                    />
                  </Box>
                  <Box>
                    <FormLabel as={"legend"} htmlFor={"lastName"}>
                      Nom :
                    </FormLabel>
                    <Controller
                      name={"lastName"}
                      control={control}
                      render={({ field }) => (
                        <Editable
                          {...field}
                          id={"lastName"}
                          as={"b"}
                          placeholder={"Non renseigné"}
                          defaultValue={
                            user.lastName === null ? "" : user.lastName
                          }
                          // onSubmit={(value) => {
                          //   setUserData({ ...userData, lastName: value });
                          // }}
                        >
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      )}
                    />
                  </Box>
                  <Box>
                    <FormLabel as={"legend"} htmlFor={"birthdate"}>
                      Date de naissance :
                    </FormLabel>
                    <Editable
                      id={"birthdate"}
                      as="b"
                      color={"grey"}
                      isDisabled={true}
                      defaultValue={
                        user.birthdate === null
                          ? "Non renseigné"
                          : formateDate(user.birthdate.toString())
                      }
                    >
                      <EditablePreview />
                    </Editable>
                  </Box>
                </Flex>
                <Divider colorScheme={"purple"} />
                <Flex justify={"space-between"} my={"1rem"}>
                  <Box>
                    <FormLabel as={"legend"} htmlFor={"location"}>
                      Ville :
                    </FormLabel>
                    <Editable
                      id={"location"}
                      as="b"
                      color={"grey"}
                      isDisabled={true}
                      defaultValue={
                        user.location === null || user.location === ""
                          ? "Rendez vous sur la carte"
                          : user.location
                      }
                    >
                      <EditablePreview />
                    </Editable>
                  </Box>
                  <Box>
                    <FormLabel as={"legend"} htmlFor={"email"}>
                      Adresse mail :
                    </FormLabel>
                    <Editable
                      id={"email"}
                      as="b"
                      color={"grey"}
                      isDisabled={true}
                      defaultValue={user.email}
                    >
                      <EditablePreview />
                    </Editable>
                  </Box>
                </Flex>
                <Divider colorScheme={"purple"} />
                <Box my={"1rem"}>
                  <FormLabel as={"legend"} htmlFor={"bio"}>
                    À propos :
                  </FormLabel>
                  <Controller
                    name={"bio"}
                    control={control}
                    render={({ field }) => (
                      <Editable
                        {...field}
                        id={"bio"}
                        as="b"
                        width={"100%"}
                        placeholder={"Non renseigné"}
                        defaultValue={user.bio === null ? "" : user.bio}
                        onSubmit={(value) => {
                          setUserData({ ...userData, bio: value });
                        }}
                      >
                        <EditablePreview />
                        <EditableTextarea />
                      </Editable>
                    )}
                  />
                </Box>
                <Divider colorScheme={"purple"} />
                <Box my={"1rem"}>
                  <Box>
                    <FormLabel as={"legend"} htmlFor={"gender"}>
                      Genre :
                    </FormLabel>
                    <Controller
                      name={"gender"}
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          colorScheme={"purple"}
                          id={"gender"}
                          as="b"
                          defaultValue={
                            user.gender === null ? Gender.UNKNOWN : user.gender
                          }
                          // onChange={(value) => {
                          //   setUserData({ ...userData, gender: value });
                          // }}
                        >
                          <HStack spacing={"0.5rem"}>
                            <Radio value={Gender.MALE}>
                              {getTextGender(Gender.MALE)}
                            </Radio>
                            <Radio value={Gender.FEMALE}>
                              {getTextGender(Gender.FEMALE)}
                            </Radio>
                            <Radio value={Gender.OTHER}>
                              {getTextGender(Gender.OTHER)}
                            </Radio>
                            <Radio value={Gender.UNKNOWN}>
                              {getTextGender(Gender.UNKNOWN)}
                            </Radio>
                          </HStack>
                        </RadioGroup>
                      )}
                    />
                  </Box>
                  {/* <Box>
                 <FormLabel as={"legend"} htmlFor={"preference"}>
                    Préference :
                  </FormLabel>
                  <RadioGroup
                    id={"preference"}
                    as="b"
                    value={
                      user.preference === null
                        ? Gender.UNKNOWN
                        : user.preference
                    }
                    onChange={(value) => {
                      setUserData({ ...userData, preference: value });
                    }}
                  >
                    <HStack spacing={"0.5rem"}>
                      <Radio value={Gender.MALE}>
                        {getTextGender(Gender.MALE)}
                      </Radio>
                      <Radio value={Gender.FEMALE}>
                        {getTextGender(Gender.FEMALE)}
                      </Radio>
                      <Radio value={Gender.OTHER}>
                        {getTextGender(Gender.OTHER)}
                      </Radio>
                      <Radio value={Gender.UNKNOWN}>
                        {getTextGender(Gender.UNKNOWN)}
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </Flex> */}
                </Box>
                <Divider colorScheme={"purple"} />
                <Center my={"1rem"}>
                  <Button
                    colorScheme={"purple"}
                    isLoading={isLoading}
                    type="submit"
                  >
                    Sauvegarder les modifications
                  </Button>
                </Center>
              </FormControl>
            </form>
          </Flex>
        </Container>
      </Box>
    );
  }
}
