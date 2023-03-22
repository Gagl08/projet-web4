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

import { BiLeftArrowAlt, BiRightArrowAlt, BiHeart } from "react-icons/bi";

import { RxCross1 } from "react-icons/rx";
import Slider from "react-slick";

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
  const { borderRadiusImg, actualUser, potentialMatch } = props;

  const [slider, setSlider] = React.useState();

  const heightPhoto = "75vh";
  const heightText = "25vh";

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

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
          {potentialMatch.images.map((url, index) => (
            <Box
              key={index}
              borderTopRadius={borderRadiusImg}
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
            {potentialMatch.firstName} {potentialMatch.lastName} ,{" "}
            {potentialMatch.age} ans
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
          <Text style={{ fontWeight: "bold" }}>{potentialMatch.aPropos}</Text>
        </Box>
        <Box m={"1vh"}>
          <h2 style={{ fontWeight: "bold" }}>Passions :</h2>
          <Flex gap={"0.5rem"} mt={"1vh"}>
            {potentialMatch.passions.map((passion, index) =>
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
