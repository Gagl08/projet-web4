import {Card, Flex, Box} from '@chakra-ui/react';
import Carousel from '../../Carousel';

export default function CardUser(props) {
  const {user} = props;

  const potentialMatch = {
    lastName: 'dujardin',
    firstName: 'jean',
    age: 19,
    aPropos: 'Je suis une personne fictive, pas tres fictive',
    images: ['401446.webp'],
    passions: ['Sport', 'Piscine', 'Formule1'],
  };

  return (
    <Card borderRadius={"1rem"}
          width={'35vw'}
          height={'90vh'}
          padding={'0px'}
          marginY={'auto'}
          overflow={'hidden'}>
      <Carousel actualUser={user}
                potentialMatch={potentialMatch}
                heightPhoto={'75vh'}
                heightText={'25vh'}/>
    </Card>
  );
}
