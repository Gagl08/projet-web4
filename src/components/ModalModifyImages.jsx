import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RiEditBoxLine } from "react-icons/ri";

export default function ModalModifyImages(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { images, userData, setUserData } = props;
  return (
    <>
      <Button
        colorScheme={"purple"}
        onClick={onOpen}
        leftIcon={<RiEditBoxLine />}
      >
        Modifier les images
      </Button>

      <Modal
        blockScrollOnMount={false}
        size={"4xl"}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modification des images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns={`repeat(${images.length + 1}, 1fr)`} gap={5}>
              {images.map((image, index) => (
                <GridItem key={index}>
                  <Flex direction={"column"} gap={"1rem"}>
                    <Image src={image} />
                    <Button
                      id={"" + index}
                      colorScheme={"red"}
                      onClick={(e) => {
                        images.splice(index, 1);
                        setUserData({
                          ...userData,
                          images: [...images],
                        });
                      }}
                    >
                      Supprimer l'image
                    </Button>
                  </Flex>
                </GridItem>
              ))}
              {images.length < 5 ? (
                <GridItem width={"100%"}>
                  <Input
                    type={"file"}
                    height={"100%"}
                    accept={"image/png, image/jpeg, image/webp"}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        images: [...images, e.target.files[0].name],
                      });
                    }}
                  ></Input>
                </GridItem>
              ) : (
                <></>
              )}
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
