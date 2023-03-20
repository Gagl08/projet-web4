import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

export default function HomeHero() {

  const RightSide = () => (
    <Flex justify={"center"} direction={"column"} flexBasis={"100%"} px={75}>
      <Heading mb={"2.5rem"} style={{color:'#FAF9FF'}}>Un match, un chat, un date ! </Heading>
      <Text mb={"2rem"} style={{color:'#FAF9FF'}}>
        Faites des rencontres en France, où que vous soyez.
        La taille de notre communauté et la popularité du site vous permettront de trouver des profils correspondant
        à vos recherches et de vivre votre rencontre en ligne en toute sérénité. Choisissez une ville ou une région et
        découvrez les profils des célibataires inscrits qui se trouvent à quelques kilomètres de chez vous.
      </Text>
    </Flex>
  );

  const LeftSide = () => (
    <Box flexBasis={"100%"}>
      <Image
        boxShadow={"lg"}
        minH={"100vh"}
        src={"/couple_funny.png"}
        alt="funny couple"
      />
    </Box>
  );

  return (
    <Flex
      bg={"#805AD5"}
      minH={"100vh"}
      align={"center"}
      justify={"center"}
    >
      <Flex gap={10}>
        <LeftSide />
        <RightSide />
      </Flex>
    </Flex>
  );
}