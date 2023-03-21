import {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'
import type {CreateUserQuery} from '@/models/api/user';

const prisma = new PrismaClient();

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const {email, password, firstName, lastName} = req.body as CreateUserQuery;

  if (!email || !password || !firstName || !lastName)
    return res.status(400).send({message: req.body});

  const newUser = await prisma.user.create({
    data: {email, password, firstName, lastName},
  });

  return res.status(201).send({message: "createUser", newUser});
}