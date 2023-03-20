import {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();
export default async function createUser(req: NextApiRequest, res: NextApiResponse) {

  
  const {email, password, name, surname} = req.body
  

  if (!email || !password) return res.status(400).send({message: req.body})
  
  const newUser = await prisma.user.create({
    data: {email, password, name, surname},
  });

  return res.status(201).send({message: "createUser", newUser});
}