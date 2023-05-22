import { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

interface Props {
  images: string[];
  borderRadius?: string | number;
}

const Carousel = ({ images, borderRadius: bRadius }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleClickNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  if (images.length === 0) images = ["blank_profile_picture.webp"];

  return (
    <Flex
      px={2}
      align="center"
      borderRadius={bRadius}
      overflow={"hidden"}
      justify={"space-between"}
      bgColor={"purple.50"}
      height={500}
      bgImage={images[currentIndex]}
      bgSize={"contain"}
      bgRepeat={"no-repeat"}
      bgPosition={"center"}
      width={"100%"}
    >
      <IconButton
        aria-label="left-arrow"
        borderRadius="full"
        onClick={handleClickPrevious}
      >
        <BiLeftArrowAlt />
      </IconButton>

      <IconButton
        aria-label="left-arrow"
        borderRadius="full"
        onClick={handleClickNext}
      >
        <BiRightArrowAlt />
      </IconButton>
    </Flex>
  );
};

export default Carousel;
