import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
// files
import connectDB from '../../mongo/config/connectDB';
import User from '../../mongo/models/User';
import setCookie from '../../utils/setCookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  // hilangin warning harus return promise
  return new Promise(async (resolve, reject) => {
    // connect db
    await connectDB();

    if (req.method === 'POST') {
      // destructure request body form
      const { email, password } = req.body;

      // check if email & pass !== empty
      if (!email || !password) {
        // error => email & password kosong
        res.status(400).json({
          error: true,
          message: 'Please, input the required email & password field',
        });
        return reject();
      }

      try {
        // find specific user
        const user = await User.findOne({ email });

        // compare password
        await bcrypt.compare(password, user.password, (err, result) => {
          if (!err && result) {
            // sign JWT and set it to cookie in header
            setCookie({ sub: user._id }, res);

            // login SUCCESS -------------------------- as ADMIN
            if (user.role === 'ADMIN') {
              res.status(200).json({ _id: user._id }); // return user._id JSON
              return resolve();
            }

            // login SUCCESS -------------------------- as USER
            res.status(200).json({
              error: false,
              message: 'You are logged in',
              // jwt: sign({ sub: user._id }, mySecretKey, { expiresIn: '3h' }), // buat cookie client
            });
            return resolve();
          } else {
            // error => salah masukin password
            res.status(400).json({
              error: true,
              message: 'Bcrypt compare error. Please, input a valid password.',
            });
            return reject();
          }
        });
      } catch (err) {
        // error => salah masukin email
        res
          .status(400) // bad request == client error
          .json({
            error: true,
            message:
              'Mongoose findOne error. Please, input valid email address.',
          });
        return reject();
      }
    } else {
      // error => invalid req method
      res.status(405).json({ error: true, message: 'Only support POST req' });
      return reject();
    }
  });
}
