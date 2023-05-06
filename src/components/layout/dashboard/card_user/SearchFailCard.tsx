import {Card, Text, CardBody, CardHeader} from '@chakra-ui/react';

const SearchFailCard = () => (
    <Card w={'100%'} h={'100%'} borderRadius={'1rem'} overflow={'hidden'}>
      <CardHeader> Aucun profil correspondant à vos critères </CardHeader>
      <CardBody>
        <Text as="b">
          Modifiez vos critères de recherche ou attendez de nouveaux inscrits
        </Text>
      </CardBody>
    </Card>
);

export default SearchFailCard;
