import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
// files
import UserModel from 'mongo/models/User'
import setCookie from 'utils/setCookie'
import withYup from 'middlewares/withYup'
import connectMongo from 'middlewares/connectMongo'
import { loginApiSchema, TLoginApiSchema } from 'yup/apiSchema'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (req.method === 'POST') {
      // destructure request body form
      const { email, password } = req.body as TLoginApiSchema

      // find specific user
      const userDoc = await UserModel.findOne({ email })

      // compare password
      const isMatch = await compare(password, userDoc.password)

      if (!isMatch) {
        // client error => password did not match -----------------------------------------------------------------
        res.status(400).json({ error: true, message: 'Password did not match' })
        return
      }

      // sign JWT and set it to cookie in header
      setCookie({ sub: userDoc._id, role: userDoc.role }, res)

      // login SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Login success',
        data: {
          _id: userDoc._id,
          name: userDoc.name,
          email: userDoc.email,
          role: userDoc.role,
          createdAt: userDoc.createdAt,
          updatedAt: userDoc.updatedAt,
        },
      })
    } else {
      // client error => Method Not Allowed -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only support POST req',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({
      error: true,
      name: err.name,
      message: err.message,
    })
  }
}

export default withYup(loginApiSchema, connectMongo(handler))
