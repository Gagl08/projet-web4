import type {NextApiRequest, NextApiResponse} from 'next';
import createUser from '@/pages/api/user/createUser';
import readUser from '@/pages/api/user/readUser';
import updateUser from '@/pages/api/user/updateUser';
import deleteUser from '@/pages/api/user/deleteUser';
import CRUD from '@/utils/CRUD';


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const {method} = req;

  if (method === CRUD.CREATE) return createUser(req, res);
  if (method === CRUD.READ) return readUser(req, res);
  if (method === CRUD.UPDATE) return updateUser(req, res);
  if (method === CRUD.DELETE) return deleteUser(req, res);
  return help(req, res);
}

function help(req: NextApiRequest, res: NextApiResponse) {
  res.status(400).send({message: 'error'}); // TODO add help message
}