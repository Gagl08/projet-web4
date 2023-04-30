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
  Flex,
  FormLabel,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import ModalModifyImages from "@/components/layout/user_profile/ModalModifyImages";
import ModalChoosePassion from "@/components/layout/user_profile/ModalChoosePassion";
import ProfileTagList from "@/components/layout/user_profile/ProfileTagList";
import LoadingPage from "@/components/LoadingPage";
import CustomEditable from "@/components/layout/user_profile/CustomEditable";
import CustomEditableArea from "@/components/layout/user_profile/CustomEditableArea";
import CustomRadioGender from "@/components/layout/user_profile/CustomRadioGender";
import CustomRangeSlider from "@/components/layout/user_profile/CustomRangeSlider";
import CustomSlider from "@/components/layout/user_profile/CustomSlider";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

export default function UserProfile() {
  const router = useRouter();
  const toast = useToast({ position: "top", isClosable: true });

  const [currentlyLoading, setCurrentlyLoading] = useState(false);
  const [passions, setPassions] = useState([] as any[]);

  const [showTooltipAge, setShowTooltipAge] = useState(false);
  const [sliderAgeValue, setSliderAgeValue] = useState([[] as number[]]);
  const [showTooltipDistance, setShowTooltipDistance] = useState(false);
  const [sliderDistanceValue, setSliderDistanceValue] = useState<number>(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

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
  }

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
                <CustomEditable
                  name="firstName"
                  defaultValue={
                    userData.firstName === null ? "" : userData.firstName
                  }
                  control={control}
                  rules={{
                    required: { value: true, message: "Prénom requis" },
                  }}
                  label={"Prénom :"}
                />
              </Box>
              <Box>
                <CustomEditable
                  name="lastName"
                  defaultValue={
                    userData.lastName === null ? "" : userData.lastName
                  }
                  control={control}
                  rules={{
                    required: { value: true, message: "Nom requis" },
                  }}
                  label={"Nom :"}
                />
              </Box>
              <Box>
                <CustomEditable
                  name="birthdate"
                  isDisabled={true}
                  defaultValue={
                    userData.birthdate === undefined ||
                    userData.birthdate === null
                      ? "Non renseigné"
                      : formateDate(userData.birthdate.toString())
                  }
                  control={control}
                  label={"Date de naissance :"}
                />
              </Box>
            </Flex>
            <Divider colorScheme={"purple"} />
            <Flex justify={"space-between"} my={"1rem"}>
              <Box>
                <CustomEditable
                  name="location"
                  isDisabled={true}
                  defaultValue={
                    userData.location === null || userData.location === ""
                      ? "Rendez vous sur la carte"
                      : userData.location
                  }
                  control={control}
                  label={"Ville :"}
                />
              </Box>
              <Box>
                <CustomEditable
                  name="email"
                  isDisabled={true}
                  defaultValue={userData.email}
                  control={control}
                  label={"Adresse mail :"}
                />
              </Box>
            </Flex>
            <Divider colorScheme={"purple"} />
            <Box my={"1rem"}>
              <CustomEditableArea
                name="bio"
                defaultValue={userData.bio === null ? "" : userData.bio}
                control={control}
                rules={{
                  maxLength: {
                    value: 240,
                    message: "240 caractères maximum",
                  },
                }}
                label={"À propos :"}
              />
            </Box>
            <Divider colorScheme={"purple"} />
            <Box my={"1rem"}>
              <Box>
                <CustomRadioGender
                  name={"gender"}
                  label={"Genre :"}
                  control={control}
                  defaultValue={
                    userData.gender === null ? Gender.UNKNOWN : userData.gender
                  }
                />
              </Box>
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
              <Center>
                <Text as={"b"} fontSize={"1.5rem"} my={"1rem"}>
                  Préférences
                </Text>
              </Center>
              <Box my={"1rem"}>
                <CustomRadioGender
                  name={"prefGender"}
                  label={"Genre :"}
                  control={control}
                  defaultValue={
                    userData.prefGender === null
                      ? Gender.UNKNOWN
                      : userData.gender
                  }
                />
              </Box>
              <Box>
                <CustomRangeSlider
                  control={control}
                  label={"Age :"}
                  name={"age"}
                  defaultValue={[userData.ageMin, userData.ageMax]}
                  setSliderAgeValue={setSliderAgeValue}
                  setShowTooltipAge={setShowTooltipAge}
                  showTooltipAge={showTooltipAge}
                  sliderAgeValue={sliderAgeValue}
                />
              </Box>
              <CustomSlider
                control={control}
                label={"Distance :"}
                name={"distance"}
                defaultValue={userData.distance}
                setSliderDistanceValue={setSliderDistanceValue}
                setShowTooltipDistance={setShowTooltipDistance}
                showTooltipDistance={showTooltipDistance}
                sliderDistanceValue={sliderDistanceValue}
              />
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
}
