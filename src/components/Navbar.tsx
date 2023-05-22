import {
  Box,
  Flex,
  Text,
  ButtonGroup,
  Button,
  Image,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

type Props = {
  variant?: "static" | "fixed";
};

export default function Navbar({ variant = "fixed" }: Props) {
  const router = useRouter();
  const { status } = useSession();

  const MiddleSection = () => {
    const authenticatedLinks = (
      <>
        <Link href={"/dashboard"}>Accueil</Link>
        <Link href={"/profile"}>Profil</Link>
        <Link href={"/map"}>Carte</Link>
        <Link href={"/graphique"}>Statistiques</Link>
      </>
    );

    return (
      <Flex gap={5} justify={"center"} flexBasis={"100%"}>
        {status === "authenticated" && authenticatedLinks}
      </Flex>
    );
  };

  const RightSection = () => {
    const authenticatedButtons = (
      <Button onClick={() => signOut()}>Déconnexion</Button>
    );

    const unauthenticatedButtons = (
      <>
        <Button onClick={() => router.push("/register")}>Inscription</Button>
        <Button onClick={() => router.push("/login")}>Connexion</Button>
      </>
    );

    return (
      <Flex justify={"right"} flexBasis={"100%"}>
        <ButtonGroup>
          {status === "authenticated"
            ? authenticatedButtons
            : unauthenticatedButtons}
        </ButtonGroup>
      </Flex>
    );
  };

  return (
    <Box
      position={variant}
      zIndex={9999}
      top={0}
      width={"100vw"}
      backdropFilter={"auto"}
      backdropBlur={"20px"}
      px={10}
      py={2}
    >
      <Flex align={"center"}>
        <Box flexBasis={"100%"}>
          <Image src={"/logo.svg"} h={"3rem"} objectFit={"contain"} />
        </Box>

        <MiddleSection />
        <RightSection />
      </Flex>
    </Box>
  );
}
