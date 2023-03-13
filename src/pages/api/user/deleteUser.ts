import {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export default async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query

  if (!id) return res.status(400).send({message: "error"});

  const deletedUser = await prisma.user.delete({
    where: { id }
  });

  return res.status(200).send({message: "deleteUser", deletedUser});
}