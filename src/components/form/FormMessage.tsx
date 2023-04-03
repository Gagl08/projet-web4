import {Button, Flex, Input} from '@chakra-ui/react';
import {useState} from 'react';
import {User} from '@prisma/client';
import {io, Socket} from 'socket.io-client';
import Message from '@/components/chat/Message';

type Props = {
  user: User,
  chatId: Props,
  socket: any
}

export default function FormMessage(props: Props) {
  const {user, socket} = props;
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text !== "") {
      socket.emit("createdMessage", {text, sender: user.id})

      // fetch("/api/messages", {
      //   method: "POST",
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({
      //     text,
      //     'User': {"connect": {'id': user.id}},
      //     'Chat': {"connect": {'id': chatId}}
      //   })
      // }).then(res => res.json()).then(res => console.log(res)).catch(err => console.error(err))
    }
  }

  return (
      <Flex gap={5} mt={5}>
        <Input type={text} colorScheme={'purple'} onChange={(evt) => setText(evt.target.value) } value={text} />
        <Button colorScheme={'purple'} onClick={handleSubmit} >Envoyer</Button>
      </Flex>
  )
}