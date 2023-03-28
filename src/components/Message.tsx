import {Card, Text, Flex} from '@chakra-ui/react';

type Props = {
  sender: 'me' | 'other'
  message: string
}

export default function Message(props: Props) {
  const {align, message} = props;

  return (
      <Flex alignItems={align === "me" ? 'end' : "start"}>
        <Card display={'flex'} px={2} py={1} bg={'purple.500'}>
          <Text>{message}</Text>
        </Card>
      </Flex>
  );
}