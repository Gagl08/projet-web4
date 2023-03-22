import { Flex } from "@chakra-ui/react";
import CardUser from "../components/CardUser";
import InfoUser from "../components/InfoUser";

export default function Test_card() {
  const user = {
    lastName: "Alexandra",
    firstName: "Lamy",
    age: 21,
    aPropos: "Je suis la personne fictive la plus fictive",
    images: ["135538.webp"],
    passions: ["Sport", "Voiture", "Cuisine"],
  };

  return (
    <Flex gap={10}>
      {/* à terme, envoyer les données du user depuis la session */}
      <InfoUser user={user} />
      <CardUser user={user} />
    </Flex>
  );
}
