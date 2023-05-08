import {
  Box,
  Button,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Passion} from '@prisma/client';
import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';

export default function PassionsInput() {
  const dispatch = useDispatch();
  const [passionsList, setPassionsList] = useState<Passion[]>([]);
  const [passions, setPassions] = useState<Passion[]>([]);

  useEffect(() => {
    fetch('/api/passions')
        .then(res => res.json())
        .then(data => setPassionsList(data));
  }, []);

  // TODO Use modal

  return (
      <>
        <Box mb={5}>
          {passionsList.map((p, index) => (
              <Tag cursor={'pointer'} m={0.5} key={index}
                   variant={(passions.includes(p)) ? 'solid' : 'outline'}
                   onClick={() =>
                       setPassions((passions.includes(p))
                                   ? passions.filter(elt => elt !== p)
                                   : [...passions, p])
                   }>
                <TagLabel>{p.name}</TagLabel>
                <TagRightIcon boxSize="12px" as={passions.includes(p) ? SmallCloseIcon : AddIcon}/>
              </Tag>
          ))}
        </Box>

        <Button isDisabled={passions.length < 3}
                onClick={() => dispatch({
                  type: 'gettingStartForm/setInput',
                  payload: {
                    inputs: {passions},
                    message: `Liste de passions`,
                  },
                })}>
          Envoyer
        </Button>
      </>
  );
};