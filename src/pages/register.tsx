import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Spacer,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

type FormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
  } = useForm();

  const router = useRouter();

  const redirect_home = () => {
    router.push('/');
  };

  const onRegister = async (values: FormValues) => {
    // Verify password
    if (values.password !== values.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Create User
    fetch('/api/user/', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    }).then(res => res.json()).then(data => {
      if (data.error) throw new Error();
      alert('Inscription réussie');
      router.push('/');
    }).catch(err => console.error(err));
  };

  const RightSide = () => (
    <Flex
      justify={'center'}
      direction={'column'}
      flexBasis={'100%'}
      align={'center'}
    >
      <Heading mb={'2.5rem'}>Inscription</Heading>
      <Box w={'25vw'}>
        <form onSubmit={handleSubmit(onRegister)}>
          <FormControl isInvalid={errors.name}>
            <Flex mb={'1rem'} gap={5}>
              <FormControl>
                <FormLabel>Prénom</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Prénom"
                  {...register('firstName', {
                    required: 'This is required',
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Nom"
                  {...register('lastName', {
                    required: 'This is required',
                  })}
                />
              </FormControl>
            </Flex>
            <FormControl mb={'1rem'}>
              <FormLabel>Adresse email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Adresse@email.com"
                {...register('email', {
                  required: 'This is required',
                })}
              />
            </FormControl>
            <FormControl mb={'1rem'}>
              <FormLabel>Mot de passe</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Mot de passe"
                {...register('password', {
                  required: 'This is required',
                })}
              />
            </FormControl>
            {/* Il y a une margin en trop mais je me suis dit que c'etais mieux d'avoir plus d'expace entre les deux */}
            <FormControl mb={'1rem'}>
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Mot de passe"
                {...register('confirmPassword', {
                  required: 'This is required',
                })}
              />
            </FormControl>

            <FormErrorMessage>
              {/*{errors.name && errors.name.message}*/}
            </FormErrorMessage>
          </FormControl>
          <Flex mt={'1rem'} w={'100%'}>
            <Button onClick={redirect_home}>Retour</Button>
            <Spacer/>
            <Button colorScheme="purple" type="submit" isLoading={isSubmitting}>
              Je m&apos;inscris
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );

  const LeftSide = () => (
    <Box flexBasis={'100%'}>
      <Image
        h={'100vh'}
        w={'100%'}
        src={'/couple_holding_hands.png'}
        alt="couple holding hands"
      />
    </Box>
  );

  return (
    <Box>
      <Flex gap={10}>
        <LeftSide/>
        <RightSide/>
      </Flex>
    </Box>
  );
}
