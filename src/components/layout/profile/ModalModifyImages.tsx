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
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";

export default function ModalModifyImages(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { images, user, userData, setUserData } = props;
  const [listImage, setlistImage] = useState(images);
  const toast = useToast({ position: "top", isClosable: true });

  const client = useQueryClient();

  const uploadImage = async (file) => {
    const body = new FormData();
    body.append("file", file);
    const imagePostOptions = {
      method: "POST",
      body,
    };

    const imagePatchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images: [...listImage, `imageUsers/${file.name}`],
      }),
    };

    fetch(`/api/file/uploadFile`, imagePostOptions)
      .then((res) => {
        fetch(`/api/users/${user.id}`, imagePatchOptions)
          .then((res) => {
            toast({
              title: `Ajout d'image effectué`,
              status: "success",
              isClosable: true,
            });
            setlistImage([...listImage, `imageUsers/${file.name}`]);
          })
          .catch(() => {
            toast({
              title: `Erreur lors de l'ajout des images`,
              status: "error",
              isClosable: true,
            });
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
    let newListImage = listImage;
    const index = newListImage.indexOf(fileName);

    if (index > -1) {
      newListImage.splice(index, 1);
      setlistImage([...newListImage]);
    }

    const imageDeleteOptions = {
      method: "DELETE",
      body: JSON.stringify({ fileName: fileName.split("/").pop() }),
    };

    fetch(`/api/file/deleteFile`, imageDeleteOptions).then((res) => {
      const imagePatchOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: [...listImage],
        }),
      };
      fetch(`/api/users/${user.id}`, imagePatchOptions)
        .then((res) => {
          toast({
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
    });
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<RiEditBoxLine />}>
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
              templateColumns={`repeat(${listImage.length + 1}, 50%)`}
              gap={5}
            >
              {listImage.map((image, index) => (
                <GridItem key={index}>
                  <Flex
                    bg={"purple.100"}
                    height={"60vh"}
                    direction={"column"}
                    gap={"1rem"}
                    justifyContent={"space-between"}
                    borderRadius={"0.5rem"}
                  >
                    <Image
                      src={image}
                      borderRadius={"0.5rem"}
                      maxHeight={"90%"}
                    />
                    <Button
                      id={index.toString()}
                      colorScheme={"red"}
                      onClick={() => deleteImage(`${listImage[index]}`)}
                    >
                      Supprimer l'image
                    </Button>
                  </Flex>
                </GridItem>
              ))}
              {listImage.length < 5 && (
                <GridItem width={"100%"}>
                  <Input
                    bg={"purple.100"}
                    type={"file"}
                    accept={"image/png, image/jpeg, image/webp"}
                    onInput={({ target }) => {
                      if (target.files[0] === undefined) return;

                      const date = new Date();
                      const time = date.getTime();

                      const file = target.files[0];
                      const extension = file.name.split(".").pop();
                      const newFile = new File(
                        [file],
                        `${user.id}_${time}.${extension}`,
                        {
                          type: file.type,
                        }
                      );
                      uploadImage(newFile);
                    }}
                  />
                </GridItem>
              )}
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                client.invalidateQueries({ queryKey: ["userProfile"] });
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
