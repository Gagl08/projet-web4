import {Server} from 'socket.io';
import prismaClient from '@/lib/prismaClient';
import type {Chat, Message as Message} from '@prisma/client';

export default async function SocketHandler(req: any, res: any) {
  const {id: chatId} = req.query;

  if (res.socket.server.io) {
    console.log('Already set up');
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on('connection', async (socket): Promise<void> => {

    await prismaClient.chat.findFirst({
      where: {id: chatId}, include: {Message: true},
    }).then((chat: (Chat & { Message: Message[] }) | null) =>
        {if (chat) socket.emit('allOldMessages', chat.Message)}
    );

    socket.on('createdMessage', async (msgInput) => {
      await prismaClient.message.create({
        data: {
          text: msgInput.text,
          User: {connect: {id: msgInput.sender}},
          Chat: {connect: {id: chatId}},
        },
      }).then((newMessage: Message) => socket.emit('newIncomingMessage', newMessage));
    });
  });

  res.end();
}