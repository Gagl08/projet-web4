import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Container,
  FormErrorMessage,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {signIn, SignInResponse} from 'next-auth/react';

import {LoginData} from '@/models/form/LoginData';
import {useForm} from 'react-hook-form';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [wrongPasswordError, setWrongPasswordError] = useState(false);

  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
  } = useForm();

  const buttonWidth = {base: '100%', md: 'unset'};

  const errorPassword = 'Mot de passe incorrect';

  const loginUser = async (value: LoginData) => {
    setIsLoading(true);
    signIn('credentials', {...value, redirect: false}).then(
        (res: unknown) => {
          const {ok: connexionSuccess} = res as SignInResponse;
          setIsLoading(false);

          if (connexionSuccess) router.push('/dashboard');
          else setWrongPasswordError(true);
        },
    );
  };

  return (
      <Box flexBasis={'100%'}>
        <Container>
          <form id="login_form" onSubmit={handleSubmit(loginUser)}>
            <Heading textAlign={'center'} size={'2xl'}>
              Connexion
            </Heading>

            {/*Email*/}
            <FormControl mb={'1rem'} id={'email'}
                         isInvalid={errors.email as boolean | undefined}>
              <FormLabel>Adresse email</FormLabel>
              <Input
                  type="text"
                  {...register('email', {
                    required: {value: true, message: 'Adresse email requise'},
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse email invalide',
                    },
                  })}
                  placeholder="adresse@email.com"
              />
              <FormErrorMessage>{errors.email?.message as string}</FormErrorMessage>
            </FormControl>

            {/*Mot de passe*/}
            <FormControl
                mb={'1rem'}
                id="password"
                isInvalid={errors.password as boolean | undefined ||
                    wrongPasswordError}
            >
              <FormLabel>Mot de passe</FormLabel>
              <Input
                  type="password"
                  placeholder="Mot de passe"
                  {...register('password', {
                    required: {value: true, message: 'Mot de passe requis'},
                  })}
              />
              <FormErrorMessage>{errors.password?.message as string}</FormErrorMessage>
              <FormErrorMessage>{wrongPasswordError &&
                  errorPassword}</FormErrorMessage>
            </FormControl>

            {/*Boutons*/}
            <Flex justify={'center'} mt={'50px'} gap={5}
                  justifyContent={'space-between'}>
              <Button onClick={() => router.push('/')} w={buttonWidth}>
                Retour
              </Button>
              <Button isLoading={isLoading} w={buttonWidth} type="submit">
                Connexion
              </Button>
            </Flex>
          </form>
        </Container>
      </Box>
  );
}
