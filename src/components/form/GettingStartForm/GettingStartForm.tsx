import {Gender, Passion, User as UserType} from '@prisma/client';
import {Box, Container, Flex, Spacer} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/redux';
import Message from '@/components/chat/Message';
import {Message as MessageType} from '@prisma/client';

import GenderInput from '@/components/form/GettingStartForm/GenderInput';
import AgeInput from '@/components/form/GettingStartForm/AgeInput';
import PassionsInput from '@/components/form/GettingStartForm/PassionsInput';
import SubmitGettingStartForm from '@/components/form/GettingStartForm/SubmitGettingStartForm';

type Props = {
  user: UserType
}

type FormInputs = {
  ownGender?: Gender
  researchGender?: Gender,
  ages?: [number, number],
  passions?: Passion[]
}

export default function GettingStartForm({user}: Props) {
  const gettingStartForm = useSelector(
      (state: RootState) => state.gettingStartForm);

  const stepComponents: JSX.Element[] = [
    <GenderInput key={0} field={'ownGender'}/>,
    <GenderInput key={1} field={'researchGender'}/>,
    <AgeInput key={2}/>,
    <PassionsInput key={3}/>,
    <SubmitGettingStartForm user={user} key={4}/>,
  ];

  return (
      <Box bgColor={'gray.50'}>
        <Container bgColor={'white'} h={'100vh'}>
          <Flex alignItems={'center'} flexDirection={'column'} h={'100%'}
                pt={5} pb={20}>

            <Flex direction={'column'} gap={1}>
              {gettingStartForm.messages.map((
                  {text, user}: { text: string, user: string },
                  index: number) => (
                  <Message align={user === 'me' ? 'right' : 'left'} key={index}
                           message={{text} as MessageType}/>
              ))}
            </Flex>

            <Spacer/>
            {stepComponents[gettingStartForm.currentStep]}
          </Flex>
        </Container>
      </Box>
  );
}