import {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {

  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  });

  return res.status(201).send({message: "createUser"}); // TODO
}