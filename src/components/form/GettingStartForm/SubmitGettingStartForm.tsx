import {Button} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {Passion, User} from '@prisma/client';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/redux';

export default function SubmitGettingStartForm({user}: { user: User }) {
  const router = useRouter();
  const gettingStartForm = useSelector(
      (state: RootState) => state.gettingStartForm);

  const handleSubmit = () => {
    const {ownGender, researchGender, ages, passions} = gettingStartForm.inputs;

    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        gender: ownGender,
        prefGender: researchGender,
        ageMin: ages[0],
        ageMax: ages[1],
        Passion: {
          connect: passions.map((p: Passion) => ({id: p.id})),
        },
      }),
    };

    fetch(`/api/users/${user.id}`, options)
        .then(() => router.push('/dashboard'))
        .catch(err => console.error(err));

  };

  return (
      <>
        <Button onClick={handleSubmit}>Ça marche!</Button>
      </>
  );
}