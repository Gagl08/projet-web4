import NextCrud, {PrismaAdapter} from '@premieroctet/next-crud';
import prismaClient from '@/lib/prismaClient';
import {NextApiRequest, NextApiResponse} from 'next';
import {hashPassword} from '@/lib/PasswordTools';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

  const nextCrudHandler = await NextCrud({
    adapter: new PrismaAdapter({prismaClient: prismaClient}),
  });

  await onUserCreate(req);

  return nextCrudHandler(req, res);
}

async function onUserCreate(req: NextApiRequest) {
  if (req.url === "/api/users" && req.method === "POST") {
    const password: string = await hashPassword(req.body.password);
    req.body = {...req.body, password}
  }
}