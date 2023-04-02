import {Button, Flex, Input} from '@chakra-ui/react';
import {useState} from 'react';
import {User} from '@prisma/client';

type Props = {
  user: User,
  chatId: Props
}

export default function FormMessage(props: Props) {
  const {user, chatId} = props;
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text !== "") {
      fetch("/api/messages", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          text,
          'User': {"connect": {'id': user.id}},
          'Chat': {"connect": {'id': chatId}}
        })
      }).then(res => res.json()).then(res => console.log(res)).catch(err => console.error(err))
    }
  }

  return (
      <Flex gap={5} mt={5}>
        <Input type={text} colorScheme={'purple'} onChange={(evt) => setText(evt.target.value) } value={text} />
        <Button colorScheme={'purple'} onClick={handleSubmit} >Envoyer</Button>
      </Flex>
  )
}