import {NextApiRequest, NextApiResponse} from 'next';

export default function readUser(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).send({message: "readUser"}); // TODO
}