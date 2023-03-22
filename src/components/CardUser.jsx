import { Card, Flex, Box } from "@chakra-ui/react";
import Carousel from "./Carousel";

export default function CardUser(props) {
  const { user } = props;
  // const data_user = props;
  const borderRad = "2rem";

  const potentialMatch = {
    lastName: "dujardin",
    firstName: "jean",
    age: 19,
    aPropos: "Je suis une personne fictive, pas tres fictive",
    images: ["401446.webp"],
    passions: ["Sport", "Piscine", "Formule1"],
  };

  return (
    <Card
      borderRadius={borderRad}
      width={"35vw"}
      height={"90vh"}
      padding={"0px"}
      marginY={"auto"}
    >
      <Carousel
        actualUser={user}
        potentialMatch={potentialMatch}
        borderRadiusImg={borderRad}
        heightPhoto={"75vh"}
        heightText={"25vh"}
      />
    </Card>
  );
}
