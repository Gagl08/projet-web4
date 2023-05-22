import type {Message as MessageType, User} from '@prisma/client';
import MessageText from '@/components/chat/MessageText';
import React from 'react';
import MessageMap from '@/components/chat/MessageMap';

type Props = {
  align: "left" | 'right'
  message: MessageType
  user?: User
}

const Message = ({message, align, user}: Props) => {
  if (message.text.match(/<!.+>/g)) {
    const regex = /<!lon=(?<lon>-?\d+\.\d+),lat=(?<lat>-?\d+\.\d+),name=(?<name>.+)>/g;
    const p = regex.exec(message.text)?.groups as unknown as {
      lon: number
      lat: number
      name: string
    }
    if (p) return <MessageMap user={user} align={align} point={p}/>
  }

  return <MessageText user={user} message={message} align={align} />
}

export default Message;