import {
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useCheckboxGroup,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { RiEditBoxLine } from "react-icons/ri";
import CustomCheckbox from "./CustomCheckbox";

export default function ModalChoosePassion(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, passions } = props;
  const toast = useToast({ position: "top", isClosable: true });
  const client = useQueryClient();

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: user.PassionID,
  });

  const savePassions = (idPassionList) => {
    let jsonPassions = { Passion: { connect: [] } };

    idPassionList.forEach((id) => {
      jsonPassions.Passion.connect.push({ id: id });
    });

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonPassions),
    };

    fetch(`/api/users/${user.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        toast({
          title: "Centres d'intérêts mis à jour",
          status: "success",
          duration: 9000,
        });
        client.invalidateQueries("user");
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button
        colorScheme={"purple"}
        onClick={onOpen}
        leftIcon={<RiEditBoxLine />}
      >
        Choisir les centres d'intérèts
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
          <ModalHeader>Choix des centres d'intérèts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"1rem"} flexWrap="wrap">
              {passions !== null ? (
                passions.map((passion, index) => {
                  return (
                    <CustomCheckbox
                      {...getCheckboxProps({ value: passion.id })}
                      key={passion.id}
                      text={passion.name}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={() => {
                savePassions(value);
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
