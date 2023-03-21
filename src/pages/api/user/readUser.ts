import {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function readUser(req: NextApiRequest, res: NextApiResponse) {
  
  const {email, password} = req.query
  
  if(!email) {
    const users = await prisma.user.findMany()
    return res.status(200).send({message: "readUser", users});
  }
  
  const user = await prisma.user.findUnique({where :{"email" : email}})
  
  if (user?.password == password) {
    res.status(200).send({message: "User found", user});
  }

  res.status(400).send({message: "Mot de passe incorrect"});

}