import {Button, ButtonGroup} from '@chakra-ui/react';
import {Gender} from '@prisma/client';
import {useDispatch} from 'react-redux';

type Props = {
  field: 'ownGender' | 'researchGender'
}

const GenderInput = ({field}: Props) => {

  const inputs = [
    {label: 'Homme', gender: Gender.MALE},
    {label: 'Femme', gender: Gender.FEMALE},
    {label: 'Autre', gender: Gender.OTHER},
  ];

  const dispatch = useDispatch();

  return (
      <ButtonGroup>
        {inputs.map(({label, gender}, index) =>
            <Button key={index} onClick={() =>
                dispatch({
                  type: 'gettingStartForm/setInput',
                  payload: {inputs: {[field]: gender}, message: label},
                })
            }>{label}</Button>,
        )}
      </ButtonGroup>
  );
};

export default GenderInput;