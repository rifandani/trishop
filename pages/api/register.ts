import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
// files
import connectDB from '../../mongo/config/connectDB';
import User from '../../mongo/models/User';
import setCookie from '../../utils/setCookie';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // hilangin warning harus return promise
  return new Promise<void>(async (resolve) => {
    // connect db
    await connectDB();

    if (req.method === 'POST') {
      // destructure request body form
      const { name, email, password } = req.body;

      // validate password
      if (password.length < 6) {
        // error => password.length < 6
        res.status(400).json({
          error: true,
          message: 'Password must at least 6 characters long',
        });
        return resolve();
      }

      // hash password with bcrypt
      const hash = bcrypt.hashSync(password, 10);

      // store hashed password in database
      User.create({ name, email, password: hash })
        .then((result) => {
          // result === object user details from mongoDB

          // set JWT token to cookie in headers
          setCookie({ sub: result._id }, res);

          // register SUCCESS --------------------------
          res.status(201).json(result);
          return resolve();
        })
        .catch((err) => {
          // CREATE user error
          res.status(500).json(err);
          return resolve();
        });
    } else {
      // error => invalid req method
      res.status(405).json({ error: true, message: 'Only support POST req' });
      return resolve();
    }
  });
}
