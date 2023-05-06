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
import {useRouter} from 'next/router';
import {signIn, SignInResponse} from 'next-auth/react';
import {RegisterData} from '@/models/form/RegisterData';
import {SubmitHandler, useForm} from 'react-hook-form';

export default function RegisterForm() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    watch,
    formState: {errors, isSubmitting},
  } = useForm();

  const validateDate = (value: string) => {
    const selected = new Date(value).getFullYear();
    const now = new Date().getFullYear();
    return now - selected >= 18 || 'Vous devez avoir 18 ans ou plus';
  };

  const submitHandler: SubmitHandler<any> = (values: RegisterData) => {
    let {email, firstName, lastName, birthdate, password, confirmPassword} =
        values;
    const date = new Date(birthdate);

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        password,
        birthdate: date,
      }),
    };

    fetch('/api/users', options)
        .then(() => signIn('credentials', {email, password, redirect: false}))
        .then((res: unknown) => {
              const {ok: connexionSuccess} = res as SignInResponse;
              router.push(connexionSuccess ? '/getting-start' : '/');
            },
        )
        .catch(err => console.error(err));
  };

  return (
      <Box flexBasis={'100%'}>
        <Container>
          <form id="register_form" onSubmit={handleSubmit(submitHandler)}>
            <Heading textAlign={'center'} size={'2xl'}>Inscription</Heading>

            <Flex mt={'100px'} mb={'1rem'} gap={5}>
              {/*Prénom*/}
              <FormControl id="firstName"
                           isInvalid={errors.firstName as boolean | undefined}>
                <FormLabel>Prénom</FormLabel>
                <Input type="text" placeholder="Prénom"
                       {...register('firstName', {
                         required: {value: true, message: 'Prénom requis'},
                       })}/>
                <FormErrorMessage>{errors.firstName?.message as string}</FormErrorMessage>
              </FormControl>

              {/*Nom*/}
              <FormControl id="lastName"
                           isInvalid={errors.lastName as boolean | undefined}>
                <FormLabel>Nom</FormLabel>
                <Input type="text" placeholder="Nom"
                       {...register('lastName', {
                         required: {value: true, message: 'Nom requis'},
                       })}/>
                <FormErrorMessage>{errors.lastName?.message as string}</FormErrorMessage>
              </FormControl>
            </Flex>

            {/*Email*/}
            <FormControl mb={'1rem'} id={'email'}
                         isInvalid={errors.email as boolean | undefined}>
              <FormLabel>Adresse email</FormLabel>
              <Input type="text" placeholder="adresse@email.com"
                     {...register('email', {
                       required: {
                         value: true,
                         message: 'Adresse email requise',
                       },
                       pattern: {
                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                         message: 'Adresse email invalide',
                       },
                     })}/>
              <FormErrorMessage>{errors.email?.message as string}</FormErrorMessage>
            </FormControl>

            {/*Date de naissance*/}
            <FormControl mb={'1rem'} id={'birthdate'}
                         isInvalid={errors.birthdate as boolean | undefined}>
              <FormLabel>Date de naissance</FormLabel>
              <Input type="date"
                     {...register('birthdate', {
                       required: {
                         value: true,
                         message: 'Date de naissance requise',
                       },
                       validate: validateDate,
                     })}/>
              {(errors.birthdate) &&
                <FormErrorMessage>{errors.birthdate.message as string}</FormErrorMessage>}
            </FormControl>

            {/*Mot de passe*/}
            <FormControl mb={'1rem'} id="password"
                         isInvalid={errors.password as boolean | undefined}>
              <FormLabel>Mot de passe</FormLabel>
              <Input type="password" placeholder="Mot de passe"
                     {...register('password', {
                       required: {value: true, message: 'Mot de passe requis'},
                     })}/>
              <FormErrorMessage>{errors.password?.message as string}</FormErrorMessage>
            </FormControl>

            {/*Mot de passe (2)*/}
            <FormControl mb={'1rem'} id="confirmPassword"
                         isInvalid={errors.confirmPassword as boolean | undefined}>
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <Input type="password" placeholder="Mot de passe"
                     {...register('confirmPassword', {
                       required: {value: true, message: 'Confirmation requise'},
                       validate: (value: string) => (
                           watch('password') === value ||
                           'Les mots de passe ne correspondent pas'
                       ),
                     })}/>
              <FormErrorMessage>{errors.confirmPassword?.message as string}</FormErrorMessage>
            </FormControl>

            <Flex mt={'50px'} w={'100%'} justify={'space-between'} gap={5}>
              <Button onClick={() => router.push('/')}
                      w={{base: '100%', md: 'unset'}}>
                Retour
              </Button>
              <Button isLoading={isSubmitting} w={{base: '100%', md: 'unset'}}
                      type="submit">
                Je m&apos;inscris
              </Button>
            </Flex>
          </form>
        </Container>
      </Box>
  );
}
