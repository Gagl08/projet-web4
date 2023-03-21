import {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client'
import type {DeleteUserQuery} from '@/models/api/user';

const prisma = new PrismaClient();

export default async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query as DeleteUserQuery
  if (!id) return res.status(400).send({message: "error"});

  const deletedUser = await prisma.user.delete({
    where: { id }
  });
  return res.status(200).send({message: "deleteUser", deletedUser});
}