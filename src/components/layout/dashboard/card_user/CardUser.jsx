import {
  Card,
  Flex,
  Text,
  CardBody,
  IconButton,
  Heading,
  Box, CardHeader,
} from '@chakra-ui/react';
import Carousel from '../../../Carousel';
import {BiHeart} from 'react-icons/bi';
import {RxCross1} from 'react-icons/rx';
import PassionBadgeList
  from '@/components/layout/dashboard/card_user/PassionBadgeList';

export default function CardUser(props) {
  const {user} = props;

  const interestingUser = {
    lastName: 'dujardin',
    firstName: 'jean',
    age: 19,
    aPropos: 'Je suis une personne fictive, pas tres fictive',
    images: ['/401446.webp', '/135538.webp'],
    passions: ['Sport', 'Piscine', 'Formule1'],
  };

  return (
    <Card w={"100%"} h={"100%"} borderRadius={'1rem'} overflow={'hidden'}>
      <CardHeader>
        <Carousel borderRadius={"1rem"} images={interestingUser.images}/>
      </CardHeader>

      <CardBody>
        <Flex justify={'space-between'} mb={'20px'}>
          <Heading fontSize={'1.5rem'} fontWeight={'bold'} flexBasis={'70%'}>
            {interestingUser.firstName} {interestingUser.lastName}, {interestingUser.age}ans
          </Heading>

          <Flex gap={1}>
            <IconButton borderRadius={'1rem'} colorScheme={'purple'}><BiHeart/></IconButton>
            <IconButton borderRadius={'1rem'} colorScheme={'purple'}
                        variant={'outline'}><RxCross1/></IconButton>
          </Flex>
        </Flex>

        <Box mb={'20px'}>
          <Heading size={'sm'} fontWeight={'bold'}>A propos :</Heading>
          <Text>{interestingUser.aPropos}</Text>
        </Box>

        <Box>
          <Heading size={'sm'} fontWeight={'bold'}>Passions :</Heading>
          <PassionBadgeList passions={interestingUser.passions}
                            userPassions={user.passions}/>
        </Box>
      </CardBody>
    </Card>
  );

}
