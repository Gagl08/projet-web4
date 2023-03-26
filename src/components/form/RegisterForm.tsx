import {
  Box, Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Container,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {signIn, SignInResponse} from 'next-auth/react';
import {RegisterData} from '@/models/form/RegisterData';

export default function RegisterForm() {
  const router = useRouter();
  const [registerData, setRegisterData] = useState(new RegisterData());
  const [isLoading, setIsLoading] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const buttonWidth = {base: '100%', md: 'unset'};

  const handleInput = (data: any) => {
    setInvalidInput(false);
    setRegisterData({...registerData, ...data});
  };

  const handleSubmit = () => {
    let {email, firstName, lastName, password, confirmPassword} = registerData;
    if (password !== confirmPassword) setInvalidInput(true);

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, firstName, lastName, password}),
    };

    setIsLoading(true);
    fetch('/api/users', options).then(() => {
      signIn('credentials', {email, password, redirect: false})
      .then((res: unknown) => {
            const {ok: connexionSuccess} = res as SignInResponse;

            // TODO If success -> goto interactive form else login
            router.push(connexionSuccess ? '/' : '/login');
          });
    }).catch(() => {
      setIsLoading(false);
      setInvalidInput(true);
      setRegisterData({...registerData, password: '', confirmPassword: ''});
    });
  };

  return (
      <Box flexBasis={'100%'}>
        <Container>
          <Heading textAlign={'center'} size={'2xl'}>Inscription</Heading>

          <Flex mt={'100px'} mb={'1rem'} gap={5}>
            {/*Prénom*/}
            <FormControl>
              <FormLabel>Prénom</FormLabel>
              <Input
                  id="firstName"
                  type="text"
                  value={registerData.firstName}
                  onChange={(evt) => handleInput({firstName: evt.target.value})}
                  placeholder="Prénom"
                  required={true}
              />
            </FormControl>

            {/*Nom*/}
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Input
                  id="lastName"
                  type="text"
                  value={registerData.lastName}
                  onChange={(evt) => handleInput({lastName: evt.target.value})}
                  placeholder="Nom"
                  required={true}
              />
            </FormControl>
          </Flex>

          {/*Email*/}
          <FormControl mb={'1rem'} isInvalid={invalidInput}>
            <FormLabel>Adresse email</FormLabel>
            <Input
                id="email"
                type="email"
                value={registerData.email}
                onChange={(evt) => handleInput({email: evt.target.value})}
                placeholder="adresse@email.com"
            />
          </FormControl>

          {/*Mot de passe*/}
          <FormControl mb={'1rem'} isInvalid={invalidInput}>
            <FormLabel>Mot de passe</FormLabel>
            <Input
                id="password"
                type="password"
                value={registerData.password}
                onChange={(evt) => handleInput({password: evt.target.value})}
                placeholder="Mot de passe"
            />
          </FormControl>

          {/*Mot de passe (2)*/}
          <FormControl mb={'1rem'} isInvalid={invalidInput}>
            <FormLabel>Confirmation du mot de passe</FormLabel>
            <Input
                id="confirmPassword"
                type="password"
                value={registerData.confirmPassword}
                onChange={(evt) => handleInput(
                    {confirmPassword: evt.target.value})}
                placeholder="Mot de passe"
            />
          </FormControl>


          <Flex mt={'50px'} w={'100%'} justify={'space-between'} gap={5}>
            <Button onClick={() => router.push('/')}
                    w={buttonWidth}>Retour</Button>
            <Button isLoading={isLoading} onClick={handleSubmit} w={buttonWidth} colorScheme="purple">Je
              m&apos;inscris</Button>
          </Flex>
        </Container>
      </Box>
  );

}
