import {NextApiRequest, NextApiResponse} from 'next';

export default function updateUser(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).send({message: "updateUser"}); // TODO
}