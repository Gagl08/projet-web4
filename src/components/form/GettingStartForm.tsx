import {useEffect, useState} from 'react';
import {
  Gender,
  Message as MessageType, Passion,
  User as UserType,
} from '@prisma/client';
import MessageList from '@/components/chat/MessageList';
import {Button, ButtonGroup, Input, Slider} from '@chakra-ui/react';

type Props = {
  user: UserType
}

type FormInputs = {
  userGender: Gender
  genderResearch: Gender,
  ages: [number, number],
  birth: Date,
  passions: Passion[]
}

export default function GettingStartForm({user}: Props) {

  const steps = [
    {
      question: 'Salut, je suis Cupibot. Il me manque quelques détails avant de terminer ton inscription. C\'est quoi ton sexe ?',
      component: ( // TODO Optimiser ça
          <ButtonGroup>
            <Button onClick={() => {
              setFormInputs({...formInputs, userGender: Gender.MALE});
              nextStep();
            }}>Homme</Button>
            <Button onClick={() => {
              setFormInputs({...formInputs, userGender: Gender.FEMALE});
              nextStep();
            }}>Femme</Button>
            <Button onClick={() => {
              setFormInputs({...formInputs, userGender: Gender.OTHER});
              nextStep();
            }}>Autre</Button>
          </ButtonGroup>
      ),
    },
    {
      question: 'Ok et tu es attiré par quel genre ?',
      component: ( // TODO Optimiser ça
          <ButtonGroup>
            <Button onClick={() => {
              setFormInputs({...formInputs, genderResearch: Gender.MALE});
              nextStep();
            }}>Homme</Button>
            <Button onClick={() => {
              setFormInputs({...formInputs, genderResearch: Gender.FEMALE});
              nextStep();
            }}>Femme</Button>
            <Button onClick={() => {
              setFormInputs({...formInputs, genderResearch: Gender.OTHER});
              nextStep();
            }}>Autre</Button>
          </ButtonGroup>),
    },
    {
      question: 'Ça marche, c\'est quoi la tranche d\'âge que tu recherche ?',
      component: (
          <>
            <Slider/>
            <Button onClick={() => nextStep()}>Suite</Button>
          </>
      ), // TODO
    },
    {
      question: 'D\'ailleurs je ne t\'ai pas demandé, quand est-ce que tu est né ?',
      component: (
          <>
            <Input type={'date'}/>
            <Button onClick={() => nextStep()}>Suite</Button>
          </>
      ), // TODO
    },
    {
      question: 'T\'as des passions dans la vie ? (Choisis-en 3 minimum)',
      component: (
          <>
            Passion selector
            <Button onClick={() => nextStep()}>Suite</Button>
          </>), // TODO
    },
    {
      question: 'Ok j\'ai toutes les infos d\'on j\'ai besoin, je vais tout faire pour te faire trouver la personne qui te correspond!',
      component: (<Button onClick={() => {/*handleSubmit()*/}}>Suite</Button>), // TODO
    },
  ];

  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<MessageType[]>([
    {text: steps[0].question} as MessageType,
  ]);

  const [formInputs, setFormInputs] = useState<FormInputs>({
    userGender: Gender.UNKNOWN,
    genderResearch: Gender.UNKNOWN,
    ages: [18, 25],
    birth: new Date(),
    passions: [],
  });

  const nextStep = () => {
    const newMessage = {text: steps[progress + 1].question} as MessageType;
    setMessages([...messages, newMessage]);
    setProgress(progress + 1);
  };

  return (
      <>
        <MessageList user={user} messages={messages}/>
        {steps[progress].component}
      </>
  );
}