import {Server} from 'socket.io';
import prismaClient from '@/lib/prismaClient';

export default async function SocketHandler(req: any, res: any) {
  const {id: chatId} = req.query;

  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log('Already set up');
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // Define actions inside
  io.on('connection', async (socket) => {
    console.log(socket.id);

    await prismaClient.chat.findFirst({
      where: {id: chatId},
      include: {Message: true},
    }).then(chat => {
      // @ts-ignore
      return socket.emit('allOldMessages', chat.Message);
    });

    socket.on('createdMessage', async (msgInput) => {
      await prismaClient.message.create({
        data: {
          text: msgInput.text,
          User: {connect: {id: msgInput.sender}},
          Chat: {connect: {id: chatId}},
        },
      }).then((newMessage) => socket.emit('newIncomingMessage', newMessage));
    });
  });

  console.log('Setting up socket');
  res.end();
}