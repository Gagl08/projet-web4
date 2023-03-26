import NextCrud, {PrismaAdapter} from '@premieroctet/next-crud';
import prismaClient from '@/lib/prismaClient';
import {NextApiRequest, NextApiResponse} from 'next';
import {hashPassword} from '@/lib/PasswordTools';

type CreateUserQuery = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

  const nextCrudHandler = await NextCrud({
    adapter: new PrismaAdapter({prismaClient: prismaClient}),
  });

  // Hash le mot de passe quand on crée un utilisateur
  if (req.url === "/api/users" && req.method === "POST") {
    const {email, password, firstName, lastName} = req.body as CreateUserQuery;

    if (!email || !password || !firstName || !lastName)
      return res.status(400).send({message: req.body});

    const hashedPassword: string = await hashPassword(password);
    req.body = {...req.body, password: hashedPassword}
  }

  return nextCrudHandler(req, res);
}