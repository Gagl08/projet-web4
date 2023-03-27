import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type {Session} from '@/models/auth/Session';
import Carousel from "@/components/Carousel";
import { Box, Button, Center, Container, Divider, Editable, EditableInput, EditablePreview, EditableTextarea, Flex, Spacer, Text, useToast } from "@chakra-ui/react";

import {RiEditBoxLine} from "react-icons/ri"
import BottomBar from "@/components/BottomBar";
import { useState } from "react";

export default function UserProfile() {
  const router = useRouter();
  const {data: session, status} = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // faire un model avec toutes les infos de user
  const [loginData, setLoginData] = useState(new userData());
  
  
  const toast = useToast();

  // if (status === 'unauthenticated') router.push('/login');

  // if (status === 'authenticated') {
    // const {user} = session as unknown as Session;


    const saveData = () => {
      // let {email, firstName, lastName, password, confirmPassword} = registerData;
      toast({
        title: `Modifications effectuées`,
        status: "success",
        isClosable: true,
      })
      // const options = {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify(userData),
      // };
  
      // setIsLoading(true);
      // fetch('/api/users', options).then(() => {
      //   setIsLoading(false)
      //   toast({
      //     title: `Modifications effectuées`,
      //     status: "success",
      //     isClosable: true,
      //   })

      // }).catch(() => {
      //   setIsLoading(false);
      //   toast({
      //     title: `Erreur lors de l'envoi des modifications`,
      //     status: "error",
      //     isClosable: true,
      //   })
      // });
    };

    const formateDate = (dateString: string) => {
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString([],options);
    }
    
    var dateString = "2018-05-18T04:00:00.000Z"
    console.log(formateDate(dateString));


    const refinedUser = {
      // ...user,
      firstName: "Jean",
      lastName: "Dujardin",
      birthdate: formateDate(new Date),
      aPropos: 'Je suis la personne fictive la plus fictive',
      images: ['135538.webp'],
      passions: ['Sport', 'Voiture', 'Cuisine'],
    };

    return (
      <Box bgColor={"purple.50"}>
        <Container justifyContent={"center"} maxWidth={"70rem"} mt={"1rem"} bgColor={"purple.50"}>
          
          <Flex flexDirection={"column"} alignItems={"center"} gap={"1rem"}> 
            <Box width={"50%"} >
              <Carousel images = {refinedUser.images} borderRadius = {"1rem"}></Carousel>
            </Box>
            <Button colorScheme={"purple"} leftIcon={<RiEditBoxLine />}>Modifier les images</Button>    
            <Divider />
            <Text align={"center"} as="i" color={"grey"}>Modifiez les champs en les selectionnants</Text>
            <Box width={"100%"} mb={"1rem"}>
              <Flex justify={"space-between"}>
                <Flex gap={"1rem"}>
                  <Text margin={"auto"}>Prénom : </Text>
                  <Editable id={'lastName'} as="b" defaultValue={refinedUser.lastName} onSubmit={(value) => {value = refinedUser.lastName}}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Flex>
                <Flex gap={"1rem"}>
                  <Text margin={"auto"}>Nom : </Text>
                  <Editable id={'firstName'} defaultValue={refinedUser.firstName}  onSubmit={(value) => refinedUser.firstName = value}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Flex>
                <Flex gap={"1rem"}>
                  <Text margin={"auto"}>Date de naissance : </Text>
                  <Text margin={"auto"} id={'birthdate'} as="b" color={"grey"} >
                    {refinedUser.birthdate}
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <BottomBar variant={"fixed"} saveData={saveData}/>
          </Flex>
        </Container>
      </Box>
    );
  // }
}