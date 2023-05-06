import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function BottomBar(props: { variant: any; saveData: any; }) {
  const router = useRouter();

  const { variant, saveData } = props;

  return (
    <Box position={variant} zIndex={0} bottom={0} backdropFilter={"auto"} px={10} py={2}>
      <Flex align={"center"}>
        <Button onClick={() => saveData()}>
          Sauvegarder les modifications
        </Button>
      </Flex>
    </Box>
  );
}
