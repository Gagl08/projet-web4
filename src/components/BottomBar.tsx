import {
    Box,
    Flex,
    Text,
    Button,
    Image,
  } from '@chakra-ui/react';
  
  
  export default function BottomBar(props) {
    
    const {variant, saveData} = props; 
    
    return (
        <Box position={variant} zIndex={0} bottom={0}
             backdropFilter={'auto'} px={10} py={2}>
          <Flex align={'center'}>
            <Button colorScheme={"purple"} onClick={() => saveData()}>Sauvegarder les modifications</Button>
          </Flex>
        </Box>
    );
  
  }
  