import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
// files
import UserModel from 'mongo/models/User'
import setCookie from 'utils/setCookie'
import withYup from 'middlewares/withYup'
import connectMongo from 'middlewares/connectMongo'
import { loginApiSchema } from 'yup/apiSchema'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      // destructure request body form
      const { email, password } = req.body

      // find specific user
      const user = await UserModel.findOne({ email })

      // compare password
      const isMatch = await compare(password, user.password)

      if (!isMatch) {
        // client error => password did not match -----------------------------------------------------------------
        res.status(400).json({ error: true, message: 'Password did not match' })
        return
      }

      // sign JWT and set it to cookie in header
      setCookie({ sub: user._id }, res)

      // login SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        role: user.role,
        userId: user._id,
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
