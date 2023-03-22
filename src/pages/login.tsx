import {
  Box,
  Flex,
} from '@chakra-ui/react';
import LoginForm from '@/components/form/LoginForm';


export default function Login() {
  return (
      <Flex gap={5} h={'100vh'} justify={'center'} alignItems={'center'}>
        <Box flexBasis={'100%'}
             display={{base: "none", md: "block"}}
             h={"100%"}
             bgImage={'/couple_horizon.png'}
             bgSize={'cover'}
             bgPos={'center'}
        />
        <LoginForm/>
      </Flex>
  );
}
