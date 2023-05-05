import {Button, Flex, FormControl, Input} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import moment from 'moment';

const BirthInput = () => {
  const dispatch = useDispatch();
  const [birth, setBirth] = useState('');

  return (
      <Flex>
        <FormControl>
          <Input type={'date'} onChange={(evt) => setBirth(evt.target.value)}
                 value={birth}/>
        </FormControl>

        <FormControl>
          <Button onClick={() => dispatch({
            type: 'gettingStartForm/setInput',
            payload: {
              inputs: {'birth': moment(birth).toISOString()},
              message: `Le ${moment(birth).format("ll")}.`, // TODO formate date
            },
          })}>Envoyer</Button>
        </FormControl>
      </Flex>
  );
};

export default BirthInput;