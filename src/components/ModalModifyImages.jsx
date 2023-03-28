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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";

export default function ModalModifyImages(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { images, userData, setUserData, files, setFiles } = props;
  const [listImage, setlistImage] = useState(images);

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
            <Grid
              templateColumns={`repeat(${listImage.length + 1}, 1fr)`}
              gap={5}
            >
              {listImage.map((image, index) => (
                <GridItem key={index}>
                  <Text>{image}</Text>
                  <Flex direction={"column"} gap={"1rem"}>
                    <Image src={image} />
                    <Button
                      id={"" + index}
                      colorScheme={"red"}
                      onClick={(e) => {
                        setlistImage(listImage.filter((_, i) => i !== index));
                        setFiles(files.filter((_, i) => i !== index));
                      }}
                    >
                      Supprimer l'image
                    </Button>
                  </Flex>
                </GridItem>
              ))}
              {listImage.length < 5 ? (
                <GridItem width={"100%"}>
                  <Input
                    type={"file"}
                    height={"100%"}
                    accept={"image/png, image/jpeg, image/webp"}
                    onChange={({ target }) => {
                      const file = target.files[0];
                      setlistImage([...listImage, URL.createObjectURL(file)]);
                      setFiles([...files, file]);
                    }}
                  ></Input>
                </GridItem>
              ) : (
                <></>
              )}
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={(e) => {
                setUserData({
                  ...userData,
                  images: [...listImage],
                });
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
