import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
// files
import UserModel from 'mongo/models/User';
import setCookie from 'utils/setCookie';
// middlewares
import withYup from 'middlewares/withYup';
import connectMongo from 'middlewares/connectMongo';
import { registerApiSchema } from 'yup/apiSchema';

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // destructure request body form
      const { name, email, password } = req.body;

      // hash password with bcrypt
      const hash = bcrypt.hashSync(password, 10);

      // store hashed password in database
      const user = await UserModel.create({ name, email, password: hash });

      // set JWT token to cookie in headers
      setCookie({ sub: user._id }, res);

      // register SUCCESS --------------------------
      res.status(201).json({ error: false, role: user.role });
    } catch (err) {
      // POST server error => Internal Server Error -----------------------------------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      });
    }
  } else {
    // client error => Method Not Allowed -----------------------------------------------------------------
    res.status(405).json({ error: true, message: 'Only support POST req' });
  }
};

export default withYup(registerApiSchema, connectMongo(handler));
