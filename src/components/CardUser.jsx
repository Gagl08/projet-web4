import { CardBody, Card, Image, Flex, Box } from "@chakra-ui/react";
import Carousel from "./Carousel";

export default function CardUser(props){
    const {user} = props;
    // const data_user = props;
    const borderRad = "1.5rem";

    return (
        <Card 
          borderRadius={borderRad}
          width={"30vw"}
          height={"100vh"}
          padding={"0px"}
            >
            <Carousel
            images = {user.images}
            borderRadiusImg = {borderRad}
            height = {"60vh"}
            />
            <Flex>
                <Box>

                </Box>
            </Flex>
        </Card>
    );
    
}