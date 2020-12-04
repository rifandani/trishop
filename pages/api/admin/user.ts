import { NextApiRequest, NextApiResponse } from 'next';
// files
import connectDB from '../../../mongo/config/connectDB';
import User from '../../../mongo/models/User';

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // connect db
  await connectDB();

  if (req.method === 'GET') {
    try {
      // get user
      const user = await User.findById(req.query._id);

      // JSON response => user ---------------------------------------- OK
      res.status(200).json(user);
    } catch (err) {
      // error 400 => BAD REQUEST
      res.status(400).json({ error: true, message: 'Bad request' });
    }
  } else {
    // error 405 => METHOD NOT ALLOWED
    res.status(405).json({
      error: true,
      message: 'Only supports GET method',
    });
  }
}
