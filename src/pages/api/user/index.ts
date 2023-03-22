import type {NextApiRequest, NextApiResponse} from 'next';
import CRUD from '@/utils/CRUD';
import {CreateUserQuery} from '@/models/api/user';
import {PrismaClient} from '@prisma/client';
import {LoginData} from '@/models/form/LoginData';
import {RegisterData} from '@/models/form/RegisterData';
import {hashPassword} from '@/lib/PasswordTools';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  switch (req.method) {
    case CRUD.CREATE: return createUser(req, res);
    case CRUD.READ: return readUser(req, res);
    default: return help(res);
  }
}

function help(res: NextApiResponse) {
  res.status(400).send({message: 'error'}); // TODO add help message
}

const prisma = new PrismaClient();

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const {email, password, firstName, lastName} = req.body as CreateUserQuery;

  if (!email || !password || !firstName || !lastName)
    return res.status(400).send({message: req.body});

  const hashedPassword = await hashPassword(password)

  const newUser = await prisma.user.create({
    data: {...req.body, password: hashedPassword},
  });

  return res.status(201).send({message: 'createUser', newUser});
}

async function readUser(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query as {id: string}

  const user = (req.query.id)
      ? await prisma.user.findUnique({where: {id}})
      : await prisma.user.findMany()
  ;

  return res.status(200).send({message: 'readUser', user});
}