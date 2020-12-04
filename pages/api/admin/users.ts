import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
// files
import connectDB from '../../../mongo/config/connectDB';
import User from '../../../mongo/models/User';

export default async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // hilangin warning harus return promise
  return new Promise(async (resolve, reject) => {
    // connect db
    await connectDB();

    if (req.method === 'GET') {
      try {
        // get all users
        const users = await User.find();

        // JSON response => [user] ---------------------------------------- OK
        res.status(200).json(users);
        return resolve();
      } catch (err) {
        // error 400 => BAD REQUEST
        res.status(400).json({ error: true, message: 'Bad request' });
        return reject();
      }
      // ------------------------------------------- POST
    } else if (req.method === 'POST') {
      // destructure request body form
      const { name, role, email, password } = req.body;

      // validate password
      if (password.length < 6) {
        // error => password.length < 6
        res.status(400).json({
          error: true,
          message: 'Password must at least 6 characters long',
        });
        return reject();
      }

      // hash password with bcrypt
      const hash = bcrypt.hashSync(password, 10);

      // store hashed password in database
      User.create({ name, role, email, password: hash })
        .then((result) => {
          // JSON response => user ---------------------------------------- CREATED
          res.status(201).json(result);
          return resolve();
        })
        .catch((err) => {
          // user error 400 => BAD REQUEST
          res.status(400).json(err);
          return reject();
        });
      // ------------------------------------------- PUT
    } else if (req.method === 'PUT') {
      // destructure request body form
      const { _id, name, email, password, role } = req.body;

      try {
        // find existing user
        const user = await User.findById(_id);

        // validate password
        if (password.length < 6) {
          // error => password.length < 6
          res.status(400).json({
            error: true,
            message: 'Password must at least 6 characters long',
          });
          return reject();
        }

        // hash new password with bcrypt
        const newHash = bcrypt.hashSync(password, 10);

        // update user
        user.name = name;
        user.role = role;
        user.email = email;
        user.password = newHash;
        await user.save();

        // JSON response => user ---------------------------------------- MODIFIED
        res.status(201).json(user);
        return resolve();
      } catch (err) {
        // user error 400 => BAD REQUEST
        res.status(400).json(err);
        return reject();
      }
      // ------------------------------------------- DELETE
    } else if (req.method === 'DELETE') {
      User.findOneAndDelete({ email: req.body.email })
        .then((result) => {
          // JSON response => deletedUser ---------------------------------------- ACCEPTED
          res.status(202).json(result);
          return resolve();
        })
        .catch((err) => {
          // user error 400 => BAD REQUEST
          res.status(400).json(err);
          return reject();
        });
    } else {
      // error 405 => METHOD NOT ALLOWED
      res.status(405).json({
        error: true,
        message: 'Only supports GET, POST, PUT, DELETE methods',
      });
      return reject();
    }
  });
}
