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
import { Passion } from "@prisma/client";

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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonPassions),
    };

    fetch(`/api/users/${user.id}`, options)
      .then((res) => res.json())
      .then(() => {
        toast({
          title: "Centres d'intérêts mis à jour",
          status: "success",
          duration: 9000,
        });
        onClose();
        client.invalidateQueries({ queryKey: ["userProfile"] });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<RiEditBoxLine />}>
        Choisir les centres d'intérêts
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
          <ModalHeader>Choix des centres d'intérêts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"1rem"} flexWrap="wrap">
              {passions &&
                passions.map((passion: Passion) => (
                  <CustomCheckbox
                    key={passion.id}
                    text={passion.name}
                    {...getCheckboxProps({ value: passion.id })}
                  />
                ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => savePassions(value)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
