import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function settings() {
  const router = useRouter();
  const toast = useToast({ position: "top", isClosable: true });

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [userData, setUserData] = useState({});

  const { data: session, status } = useSession();
  if (status === "unauthenticated") router.push("/login");

  if (status === "authenticated") {
    const { user } = session as unknown as Session;

    if (user.role !== "ADMIN") router.push("/login");

    const savePassion = (passion: any) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passion),
      };

      fetch(`/api/passions`, options)
        .then((res) => {
          setIsLoading(false);
          toast({
            title: `Passion ajoutée`,
            status: "success",
          });
        })
        .catch((err) => {
          setIsLoading(false);
          toast({
            title: `Erreur lors de l'ajout`,
            status: "error",
          });
        });
    };

    return (
      <>
        <Box
          as="form"
          id="form_passion"
          width={"80%"}
          onSubmit={handleSubmit(savePassion)}
        >
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="passion">Passion</FormLabel>
            <Input
              id="passion"
              placeholder="passion"
              {...register("name", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="purple"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </>
    );
  }
}
