import {NextApiRequest, NextApiResponse} from 'next';

export default function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).send({message: "deleteUser"}); // TODO
}