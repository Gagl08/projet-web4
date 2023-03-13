import {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export default async function readUser(req: NextApiRequest, res: NextApiResponse) {
  const users = await prisma.user.findMany()

  return res.status(200).send({message: "readUser", users});
}