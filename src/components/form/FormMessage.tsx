import {Button, Flex, Input} from '@chakra-ui/react';
import {useState} from 'react';
import {User} from '@prisma/client';

type Props = {
  user: User,
  chatId: Props,
  socket: any
}

export default function FormMessage(props: Props) {
  const {user, socket} = props;
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text) socket.emit("createdMessage", {text, sender: user.id})
  }

  return (
      <Flex gap={5} mt={5}>
        <Input type={text} onChange={evt => setText(evt.target.value) } value={text}/>
        <Button onClick={handleSubmit}>Envoyer</Button>
      </Flex>
  )
}