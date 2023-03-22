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
import {signIn, SignInResponse} from 'next-auth/react';

import {LoginData} from '@/models/form/LoginData';

export default function LoginForm() {
  const router = useRouter();
  const [loginData, setLoginData] = useState(new LoginData());
  const [invalidInput, setInvalidInput] = useState(false);

  const buttonWidth = {base: '100%', md: 'unset'};

  const handleInput = (data: any) => {
    setInvalidInput(false);
    setLoginData({...loginData, ...data});
  };

  const handleSubmit = async () => {
    await signIn('credentials',
        {...loginData, redirect: false}).then((res) => {
      const {ok: connexionSuccess} = res as SignInResponse;

      if (!connexionSuccess) setInvalidInput(true);
      else router.push('/');
    });
  };

  return (
      <Box flexBasis={'100%'}>
        <Container>
          <Heading textAlign={'center'} size={'2xl'}>Connexion</Heading>

          {/* Email */}
          <FormControl mb={'1rem'} mt={'100px'} isInvalid={invalidInput}>

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
          </FormControl>

          {/* Mot de passe */
          }
          <FormControl mb={'1rem'}>
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
          </FormControl>

          {/*Boutons*/
          }
          <Flex justify={'center'} mt={'50px'} gap={5}
                justifyContent={'space-between'}>
            <Button onClick={() => router.push('/')}
                    w={buttonWidth}>Retour</Button>
            <Button onClick={handleSubmit}
                    w={buttonWidth} colorScheme="purple">Connexion</Button>
          </Flex>
      </Container>
</Box>
)

}