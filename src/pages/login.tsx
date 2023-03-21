import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Spacer,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

type FormValues = {
  email: string
  password: string
}

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
  } = useForm();

  const router = useRouter();

  const onLogin = async (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
    // faut voir ce qu'on fait quand on se connecte
  };

  const goHome = () => {
    router.push('/');
  };

  const RightSide = () => (
      <Flex
          justify={'center'}
          direction={'column'}
          flexBasis={'100%'}
          align={'center'}
      >
        <Heading mb={'2.5rem'}>Connexion</Heading>

        <Box w={'25vw'}>
          <form onSubmit={handleSubmit(onLogin)}>
            <FormControl isInvalid={errors.name}>
              <Box mb={'1rem'}>
                <FormLabel>Adresse email</FormLabel>
                <Input
                    id="email"
                    type="email"
                    placeholder="Adresse@email.com"
                    {...register('email', {
                      required: 'This is required',
                    })}
                />
              </Box>
              <Box mb={'1rem'}>
                <FormLabel>Mot de passe</FormLabel>
                <Input
                    id="pwd"
                    type="password"
                    placeholder="Mot de passe"
                    {...register('password', {
                      required: 'This is required',
                    })}
                />
              </Box>
              <Flex mt={'1rem'} w={'100%'}>
                <Button onClick={goHome}>Retour</Button>
                <Spacer/>
                <Button colorScheme="purple" type="submit">Connexion</Button>
              </Flex>
            </FormControl>
          </form>
        </Box>
      </Flex>
  );

  const LeftSide = () => (
      <Box flexBasis={'100%'}>
        <Image
            h={'100vh'}
            w={'100%'}
            src={'/couple_horizon.png'}
            alt="couple looking at horizon"
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
