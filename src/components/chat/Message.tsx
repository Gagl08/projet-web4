import type {Message as MessageType} from '@prisma/client';
import MessageText from '@/components/chat/MessageText';
import React from 'react';
import { Icon } from "leaflet";
import MessageMap from '@/components/chat/MessageMap';

type Props = {
  align: "left" | 'right'
  message: MessageType
}

const Message = ({message, align}: Props) => {
  if (message.text.match(/<!.+>/g)) {
    const regex = /<!lon=(?<lon>-?\d+\.\d+),lat=(?<lat>-?\d+\.\d+),name=(?<name>.+)>/g;
    const p = regex.exec(message.text)?.groups as unknown as {
      lon: number
      lat: number
      name: string
    }
    if (p) return <MessageMap align={align} point={p}/>
  }

  return (
      <MessageText message={message} align={align} />
  )
}

export default Message;