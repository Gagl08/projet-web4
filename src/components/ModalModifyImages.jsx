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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";

export default function ModalModifyImages(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { images, user, userData, setUserData, files, setFiles } = props;
  const [listImage, setlistImage] = useState(images);
  const toast = useToast();

  const uploadImage = async (file) => {
    console.log(file);
    const body = new FormData();
    body.append("file", file);
    const imagePostOptions = {
      method: "POST",
      body,
    };

    fetch(`/api/file/file`, imagePostOptions)
      .then((res) => {
        console.log(res);
        toast({
          title: `Ajout d'image effectué`,
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: `Erreur lors de l'ajout des images`,
          status: "error",
          isClosable: true,
        });
        console.log(err);
      });
  };

  const deleteImage = async (fileName) => {
    const body = new FormData();
    body.append("fileName", fileName);
    const imageDeleteOptions = {
      method: "DELETE",
    };

    fetch(`/api/file/file/${fileName}`, imageDeleteOptions)
      .then((res) => {
        console.log(res);
        Toast({
          title: `Suppression d'image effectué`,
          status: "success",
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: `Erreur lors de la suppression des images`,
          status: "error",
          isClosable: true,
        });
      });
  };

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
                      const extension = file.name.split(".").pop();
                      const newFile = new File(
                        [file],
                        `${user.id}_${listImage.length}.${extension}`,
                        {
                          type: file.type,
                        }
                      );
                      uploadImage(newFile);
                      setlistImage([
                        ...listImage,
                        URL.createObjectURL(newFile),
                      ]);
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
