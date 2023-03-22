import {
  Box, Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Container,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {signIn, SignInResponse,} from 'next-auth/react';

import {LoginData} from '@/models/form/LoginData';

export default function LoginForm() {
  const router = useRouter();
  const [loginData, setLoginData] = useState(new LoginData());
  const [invalidInput, setInvalidInput] = useState(false);

  const buttonWidth = {base: '100%', md: 'unset'};

  const handleInput = ({email = loginData.email, password = loginData.password}) => {
    setInvalidInput(false);
    setLoginData(new LoginData(email, password));
  };

  const handleSubmit = async () => {
    const {email, password} = loginData;
    await signIn('credentials',
        {email, password, redirect: false})
    .then((res) => {
      const {ok} = res as SignInResponse

      if (!ok) setInvalidInput(true)
      else router.push("/")
    });
  };

  return (
      <Box flexBasis={'100%'}>
        <Container>
          <Heading textAlign={'center'} size={'2xl'}>Connexion</Heading>

          {/* Email */}
          <FormControl mt={'100px'} isInvalid={invalidInput}>
            <Box mb={'1rem'}>
              <FormLabel>Adresse email</FormLabel>
              <Input
                  isInvalid={invalidInput}
                  id={'email'}
                  type={'email'}
                  value={loginData.email}
                  onChange={(evt) => handleInput({email: evt.target.value})}
                  placeholder={'adresse@email.com'}
                  required={true}
              />
            </Box>

            {/* Mot de passe */}
            <Box mb={'1rem'}>
              <FormLabel>Mot de passe</FormLabel>
              <Input
                  isInvalid={invalidInput}
                  id={'password'}
                  type={'password'}
                  value={loginData.password}
                  onChange={(evt) => handleInput({password: evt.target.value})}
                  placeholder={'Mot de passe'}
                  required={true}
              />
            </Box>

            {/*Boutons*/}
            <Flex justify={'center'} mt={'50px'} gap={5}
                  justifyContent={'space-between'}>
              <Button onClick={() => router.push('/')}
                      w={buttonWidth}>Retour</Button>
              <Button onClick={handleSubmit}
                      w={buttonWidth} colorScheme="purple">Connexion</Button>
            </Flex>

          </FormControl>
        </Container>
      </Box>
  );
}