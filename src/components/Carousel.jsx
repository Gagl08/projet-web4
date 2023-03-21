import React from "react";
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  useBreakpointValue,
  ButtonGroup,
  Badge,
  Text,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import {
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiHeart,
  // RxCross1,
} from "react-icons/bi";

import { RxCross1 } from "react-icons/rx";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel(props) {
  const { borderRadiusImg, user } = props;
  // As we have used custom buttons, we need a reference variable to
  // change the state

  // C'est l'utilisateur qui est login
  const actualUser = {
    lastName: "Alexandra",
    firstName: "Lamie",
    age: 21,
    aPropos: "Je suis la personne fictive la plus fictive",
    images: ["401446.webp"],
    passions: ["Sport", "Voiture", "Cuisine"],
  };

  const [slider, setSlider] = React.useState();

  const heightPhoto = "75vh";
  const heightText = "25vh";

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  // These are the images used in the slide
  //   const cards = [
  //     'https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
  //     'https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
  //     'https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
  //   ];

  return (
    <>
      <Box
        position={"relative"}
        height={heightPhoto}
        width={"full"}
        overflow={"hidden"}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          colorScheme="purple"
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          colorScheme="purple"
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt />
        </IconButton>
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {user.images.map((url, index) => (
            <Box
              key={index}
              borderTopEndRadius={borderRadiusImg}
              height={heightPhoto}
              backgroundPosition="center"
              backgroundSize="cover"
              backgroundImage={`url(${url})`}
            />
          ))}
        </Slider>
      </Box>
      <Box
        height={heightText}
        borderBottomRadius={borderRadiusImg}
        // bgGradient="radial(purple.200, purple.300)"
      >
        <Flex m={"1vh"}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {user.firstName} {user.lastName} , {user.age} ans
          </h1>
          <Spacer />
          <Box alignItems="center" display="flex">
            <Flex flexDirection={{ base: "row", sm: "column" }}>
              <ButtonGroup gap={"0.5rem"}>
                <IconButton borderRadius={"1rem"} colorScheme={"pink"}>
                  <BiHeart />
                </IconButton>
                <IconButton borderRadius={"1rem"} colorScheme={"red"}>
                  <RxCross1 />
                </IconButton>
              </ButtonGroup>
            </Flex>
          </Box>
        </Flex>

        <Box m={"1vh"}>
          <Text style={{ fontWeight: "bold" }}>{user.aPropos}</Text>
        </Box>
        <Box m={"1vh"}>
          <h2 style={{ fontWeight: "bold" }}>Passions :</h2>
          <Flex gap={"0.5rem"} mt={"1vh"}>
            {user.passions.map((passion, index) =>
              actualUser.passions.includes(passion) ? (
                <Badge borderRadius={"0.5rem"} colorScheme={"purple"}>
                  #{passion}
                </Badge>
              ) : (
                <Badge borderRadius={"0.5rem"}>#{passion}</Badge>
              )
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
