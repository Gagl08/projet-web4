import {Box, Flex, Heading, Text} from '@chakra-ui/react';

export default function PresentationSection() {
  return (
      <Flex justify={{base: 'center', md: 'right'}} alignItems={'center'}
            bg={{base: '#805AD5'}} bgImage={'/couple_funny.png'}
            bgSize={'cover'} bgPos={'center'}
            bgAttachment={'fixed'} minH={{base: 'initial', md: '80vh'}}>

        <Box p={50} width={{base: '100%', md: '50%'}} maxW={{md: "500px"}} bg={'#805AD5'}>
          <Heading mb={'2.5rem'} style={{color: '#FAF9FF'}}>
            Un match, un chat, un date !
          </Heading>
          <Text mb={'2rem'} style={{color: '#FAF9FF'}}>
            Faites des rencontres en France, où que vous soyez.
            La taille de notre communauté et la popularité du site vous
            permettront de trouver des profils correspondant
            à vos recherches et de vivre votre rencontre en ligne en toute
            sérénité. Choisissez une ville ou une région et
            découvrez les profils des célibataires inscrits qui se trouvent à
            quelques kilomètres de chez vous.
          </Text>
        </Box>
        <Box display={{base: "none", md: "block"}} bg={'#805AD5'} h={"100%"} w={"100px"}/>

      </Flex>
  );
}