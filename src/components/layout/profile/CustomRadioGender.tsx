import {FormLabel, HStack, Radio, RadioGroup} from '@chakra-ui/react';
import {Gender} from '@prisma/client';
import {Controller, ControllerProps} from 'react-hook-form';

type CustomRadioGenderProps = {
  label: string;
} & Omit<ControllerProps, 'render'>;

export default function CustomRadioGender(props: CustomRadioGenderProps) {
  const {defaultValue, label, name, ...controllerProps} = props;

  const genders = [
    {label: 'Homme', gender: Gender.MALE},
    {label: 'Femme', gender: Gender.FEMALE},
    {label: 'Autre', gender: Gender.OTHER},
    {label: 'Non renseigné', gender: Gender.UNKNOWN},
  ];

  return (
      <>
        <FormLabel as={'legend'} htmlFor={name}>{label}</FormLabel>
        <Controller{...controllerProps} name={name}
                   render={({field}) => (
                       <RadioGroup{...field} id={name} as="b"
                                  defaultValue={defaultValue}>
                         <HStack spacing={'0.5rem'}>
                           {genders.map(({label, gender}, index) => (
                               <Radio key={index} value={gender}>{label}</Radio>
                           ))}
                         </HStack>
                       </RadioGroup>
                   )}/>
      </>
  );
}
