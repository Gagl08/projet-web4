import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const redirect_home = () => {
    router.push("/");
  };

  const onRegister = async (values) => {
    alert(JSON.stringify(values, null, 2));
    // if (values.pwd !== values.pwd_bis) {
    //   alert("Les mots de passe ne correspondent pas");
    //   return;
    // }
    // try {
    //   const response = await fetch("/api/user/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });
    //   const data = await response.json();
    //   if (data.error) {
    //     alert(data.message);
    //   } else {
    //     console.log(data);
    //     alert("Inscription réussie");
    //     router.push("/");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const RightSide = () => (
    <Flex
      justify={"center"}
      direction={"column"}
      flexBasis={"100%"}
      align={"center"}
    >
      <Heading mb={"2.5rem"}>Inscription</Heading>
      <Box w={"25vw"}>
        <form onSubmit={handleSubmit(onRegister)}>
          <FormControl isInvalid={errors.name}>
            <Flex mb={"1rem"} gap={5}>
              <FormControl>
                <FormLabel>Prénom</FormLabel>
                <Input
                  id="prenom"
                  type="text"
                  placeholder="Prénom"
                  {...register("prenom", {
                    required: "This is required",
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input
                  id="nom"
                  type="text"
                  placeholder="Nom"
                  {...register("nom", {
                    required: "This is required",
                  })}
                />
              </FormControl>
            </Flex>
            <FormControl mb={"1rem"}>
              <FormLabel>Adresse email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Adresse@email.com"
                {...register("email", {
                  required: "This is required",
                })}
              />
            </FormControl>
            <FormControl mb={"1rem"}>
              <FormLabel>Mot de passe</FormLabel>
              <Input
                id="pwd"
                type="password"
                placeholder="Mot de passe"
                {...register("pwd", {
                  required: "This is required",
                })}
              />
            </FormControl>
            {/* Il y a une margin en trop mais je me suis dit que c'etais mieux d'avoir plus d'expace entre les deux */}
            <FormControl mb={"1rem"}>
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <Input
                id="pwd_bis"
                type="password"
                placeholder="Mot de passe"
                {...register("pwd_bis", {
                  required: "This is required",
                })}
              />
            </FormControl>

            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <Flex mt={"1rem"} w={"100%"}>
            <Button onClick={redirect_home}>Retour</Button>
            <Spacer />
            <Button colorScheme="purple" type="submit" isLoading={isSubmitting}>
              Je m'inscris
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );

  const LeftSide = () => (
    <Box flexBasis={"100%"}>
      <Image
        h={"100vh"}
        w={"100%"}
        src={"/couple_holding_hands.png"}
        alt="couple holding hands"
      />
    </Box>
  );

  return (
    <Box>
      <Flex gap={10}>
        <LeftSide />
        <RightSide />
      </Flex>
    </Box>
  );
}
