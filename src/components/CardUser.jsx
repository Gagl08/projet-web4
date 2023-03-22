import { Card, Flex, Box } from "@chakra-ui/react";
import Carousel from "./Carousel";

export default function CardUser(props) {
  const { user } = props;
  // const data_user = props;
  const borderRad = "2rem";

  return (
    <Card
      borderRadius={borderRad}
      width={"30vw"}
      height={"100vh"}
      padding={"0px"}
    >
      <Carousel
        user={user}
        borderRadiusImg={borderRad}
        heightPhoto={"75vh"}
        heightText={"25vh"}
      />
      <Flex>
        <Box></Box>
      </Flex>
    </Card>
  );
}
