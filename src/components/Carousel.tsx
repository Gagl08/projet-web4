import {useState} from 'react';
import {Flex, IconButton} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

interface Props {
  images: string[];
}

const Carousel = ({images}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickPrevious = () => {
    setCurrentIndex(
        (currentIndex === 0)
            ? images.length - 1
            : currentIndex - 1,
    );
  };

  const handleClickNext = () => {
    setCurrentIndex(
        (currentIndex === images.length - 1)
            ? 0
            : currentIndex + 1,
    );
  };

  return (
      <Flex px={2} align="center" justify={'space-between'}
            bgImage={images[currentIndex]} bgSize={'cover'} width={'100%'}
            height={500}>
        <IconButton aria-label="left-arrow" colorScheme="purple"
                    borderRadius="full" onClick={handleClickPrevious}>
          <BiLeftArrowAlt/>
        </IconButton>

        <IconButton aria-label="left-arrow" colorScheme="purple"
                    borderRadius="full" onClick={handleClickNext}>
          <BiRightArrowAlt/>
        </IconButton>
      </Flex>
  );
};

export default Carousel;
