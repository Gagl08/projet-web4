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
  Radio,
  RadioGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";

import ModalModifyImages from "@/components/layout/user_profile/ModalModifyImages";
import ModalChoosePassion from "@/components/layout/user_profile/ModalChoosePassion";
import ProfileTagList from "@/components/layout/user_profile/ProfileTagList";
import LoadingPage from "@/components/LoadingPage";

import { FaGreaterThan, FaLessThan, FaWalking } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

export default function UserProfile() {
  const router = useRouter();
  const toast = useToast({ position: "top", isClosable: true });

  const [currentlyLoading, setCurrentlyLoading] = useState(false);
  const [passions, setPassions] = useState(null);

  const [showTooltipAge, setShowTooltipAge] = useState(true);
  const [sliderAgeValue, setSliderAgeValue] = useState([]);
  const [showTooltipDistance, setShowTooltipDistance] = useState(true);
  const [sliderDistanceValue, setSliderDistanceValue] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`/api/passions`)
      .then((res) => res.json())
      .then((data) => {
        setPassions([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { data: session, status } = useSession();

  const {
    isLoading,
    isError,
    data: userData,
    error,
  } = useQuery({
    queryKey: ["user"],
    enabled: status === "authenticated",
    queryFn: async () => {
      const { user } = session as unknown as Session;

      setSliderAgeValue([user.ageMin, user.ageMax]);
      setSliderDistanceValue(user.distance);

      return fetch(`/api/users/${user.id}`)
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
    let trueValues = {};
    console.log(values);

    for (const [key, value] of Object.entries(values)) {
      if (value !== "" && value !== undefined) {
        if (key === "age") {
          trueValues["ageMin"] = value[0];
          trueValues["ageMax"] = value[1];
        } else {
          trueValues[key] = value;
        }
      }
    }

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trueValues),
    };

    if (Object.keys(trueValues).length > 0) {
      setCurrentlyLoading(true);
      fetch(`/api/users/${userData.id}`, options)
        .then((res) => {
          setCurrentlyLoading(false);
          toast({
            position: "top",
            title: `Modifications effectuées`,
            status: "success",
            isClosable: true,
          });
          // router.reload();
        })
        .catch((err) => {
          setCurrentlyLoading(false);
          toast({
            title: `Erreur lors de l'envoi des modifications`,
            position: "top",
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
      <Container justifyContent={"center"} maxW={"70rem"} mt={"1rem"}>
        <Flex flexDirection={"column"} alignItems={"center"} gap={"1rem"}>
          <Box width={"50%"}>
            {userData.images ? (
              <Carousel
                images={userData.images}
                borderRadius={"1rem"}
              ></Carousel>
            ) : (
              <Carousel
                images={userData.images}
                borderRadius={"1rem"}
              ></Carousel>
            )}
          </Box>
          <ModalModifyImages
            userData={userData}
            user={userData}
            images={userData.images}
          />

          <Divider colorScheme={"purple"} />
          <Text align={"center"} as="i" color={"grey"}>
            Modifiez les champs en les selectionnants
          </Text>

          <Box as="form" onSubmit={handleSubmit(saveData)} width={"80%"}>
            <Flex width={"100%"} justify={"space-between"} mb={"1rem"}>
              <Box>
                <FormControl id="firstName" isInvalid={errors.firstName}>
                  <FormLabel as="legend" htmlFor={"firstName"}>
                    Prénom :
                  </FormLabel>
                  <Controller
                    name={"firstName"}
                    control={control}
                    defaultValue={
                      userData.firstName === null ? "" : userData.firstName
                    }
                    rules={{
                      required: { value: true, message: "Prénom requis" },
                    }}
                    render={({ field }) => {
                      return (
                        <Editable
                          {...field}
                          id={"firstName"}
                          as={"b"}
                          placeholder={"Non renseigné"}
                        >
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      );
                    }}
                  />
                  <FormErrorMessage as="b">
                    {errors.firstName?.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isInvalid={errors.lastName}>
                  <FormLabel as={"legend"} htmlFor={"lastName"}>
                    Nom :
                  </FormLabel>
                  <Controller
                    name={"lastName"}
                    control={control}
                    defaultValue={
                      userData.lastName === null ? "" : userData.lastName
                    }
                    rules={{
                      required: { value: true, message: "Nom requis" },
                    }}
                    render={({ field }) => (
                      <Editable
                        {...field}
                        id={"lastName"}
                        as={"b"}
                        placeholder={"Non renseigné"}
                      >
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    )}
                  />
                  <FormErrorMessage as={"b"}>
                    {errors.lastName?.message}
                  </FormErrorMessage>
                </FormControl>
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
                    userData.birthdate === undefined ||
                    userData.birthdate === null
                      ? "Non renseigné"
                      : formateDate(userData.birthdate.toString())
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
                    userData.location === null || userData.location === ""
                      ? "Rendez vous sur la carte"
                      : userData.location
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
                  defaultValue={userData.email}
                >
                  <EditablePreview />
                </Editable>
              </Box>
            </Flex>
            <Divider colorScheme={"purple"} />
            <Box my={"1rem"}>
              <FormControl id="lastName" isInvalid={errors.bio}>
                <FormLabel as={"legend"} htmlFor={"bio"}>
                  À propos :
                </FormLabel>
                <Controller
                  name={"bio"}
                  control={control}
                  defaultValue={userData.bio === null ? "" : userData.bio}
                  rules={{
                    maxLength: {
                      value: 240,
                      message: "240 caractères maximum",
                    },
                  }}
                  render={({ field }) => (
                    <Editable
                      {...field}
                      id={"bio"}
                      as="b"
                      width={"100%"}
                      placeholder={"Non renseigné"}
                      defaultValue={userData.bio === null ? "" : userData.bio}
                    >
                      <EditablePreview />
                      <EditableTextarea />
                    </Editable>
                  )}
                />
                <FormErrorMessage as="b">
                  {errors?.bio?.message ?? ""}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Divider colorScheme={"purple"} />
            <Box my={"1rem"}>
              <Box>
                <FormLabel as={"legend"} htmlFor={"passion"}>
                  Centre d'intéret :
                </FormLabel>
                <VStack gap={"1rem"} align="start">
                  <ProfileTagList
                    userPassions={
                      userData.PassionID !== undefined ? userData.PassionID : []
                    }
                    passions={passions}
                  />
                  <ModalChoosePassion user={userData} passions={passions} />
                </VStack>
              </Box>
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
                        userData.gender === null
                          ? Gender.UNKNOWN
                          : userData.gender
                      }
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
            </Box>
            <Divider colorScheme={"purple"} />
            <Box my={"1rem"}>
              <Center>
                <Text as={"b"} fontSize={"1.5rem"} my={"1rem"}>
                  Préférences
                </Text>
              </Center>
              <Box my={"1rem"}>
                <FormLabel as={"legend"} htmlFor={"prefGender"}>
                  Genre :
                </FormLabel>
                <Controller
                  name={"prefGender"}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      colorScheme={"purple"}
                      id={"prefGender"}
                      as="b"
                      defaultValue={
                        userData.prefGender === null
                          ? Gender.UNKNOWN
                          : userData.gender
                      }
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
              <Box>
                <FormLabel as={"legend"} htmlFor={"prefGender"}>
                  Age :
                </FormLabel>
                <Controller
                  name={"age"}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <RangeSlider
                      aria-label={["min", "max"]}
                      colorScheme={"purple"}
                      min={18}
                      max={99}
                      id={"age"}
                      color={"pink.500"}
                      defaultValue={[userData.ageMin, userData.ageMax]}
                      onChange={(v) => {
                        setSliderAgeValue(v);
                        onChange(v);
                      }}
                      onMouseEnter={() => setShowTooltipAge(true)}
                      onMouseLeave={() => setShowTooltipAge(false)}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack bgColor={"purple.500"} />
                      </RangeSliderTrack>
                      <Tooltip
                        hasArrow
                        bg="purple.500"
                        color="white"
                        placement="top"
                        isOpen={showTooltipAge}
                        label={`${sliderAgeValue[0]}`}
                      >
                        <RangeSliderThumb boxSize={6} index={0}>
                          <Box color={"purple.500"} as={FaLessThan} />
                        </RangeSliderThumb>
                      </Tooltip>

                      <Tooltip
                        hasArrow
                        bg="purple.500"
                        color="white"
                        placement="top"
                        isOpen={showTooltipAge}
                        label={`${sliderAgeValue[1]}`}
                      >
                        <RangeSliderThumb boxSize={6} index={1}>
                          <Box color={"purple.500"} as={FaGreaterThan} />
                        </RangeSliderThumb>
                      </Tooltip>
                    </RangeSlider>
                  )}
                />
              </Box>
              {/* <Box>
                <FormLabel as={"legend"} htmlFor={"distance"}>
                  Distance :
                </FormLabel>
                <Controller
                  name={"distance"}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Slider
                      aria-label={"distance"}
                      colorScheme={"purple"}
                      min={20}
                      max={250}
                      id={"distance"}
                      color={"pink.500"}
                      defaultValue={userData.distance}
                      onChange={(v) => {
                        setSliderDistanceValue(v);
                        onChange(v);
                      }}
                      onMouseEnter={() => setShowTooltipDistance(true)}
                      onMouseLeave={() => setShowTooltipDistance(false)}
                    >
                      <SliderTrack>
                        <SliderFilledTrack bgColor={"purple.500"} />
                      </SliderTrack>
                      <Tooltip
                        hasArrow
                        bg="purple.500"
                        color="white"
                        placement="top"
                        isOpen={showTooltipDistance}
                        label={`${sliderDistanceValue} km`}
                      >
                        <SliderThumb boxSize={6}>
                          <Box color={"purple.500"} as={FaWalking} />
                        </SliderThumb>
                      </Tooltip>
                    </Slider>
                  )}
                />
              </Box> */}
            </Box>
            <Divider colorScheme={"purple"} />
            <Center gap={"1rem"} my={"1rem"}>
              <Button
                colorScheme={"purple"}
                isLoading={currentlyLoading}
                type="submit"
              >
                Sauvegarder les modifications
              </Button>
              <Button
                colorScheme={"purple"}
                variant="outline"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                Retour
              </Button>
            </Center>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
  // }
}
