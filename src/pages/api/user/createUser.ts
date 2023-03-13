import {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();
export default async function createUser(req: NextApiRequest, res: NextApiResponse) {

  const {email, password} = req.query
  if (!email || !password) return res.status(400).send({message: "error"})

  const newUser = await prisma.user.create({
    data: {email, password},
  });

  return res.status(201).send({message: "createUser", newUser});
}