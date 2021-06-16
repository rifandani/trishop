import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { hashSync } from 'bcrypt'
// files
import UserModel from 'mongo/models/User'
import withYup from 'middlewares/withYup'
import connectMongo from 'middlewares/connectMongo'
import initMiddleware from 'middlewares/initMiddleware'
import { setAuthCookie } from 'utils/setCookie'
import { registerApiSchema, TRegisterApiSchema } from 'yup/apiSchema'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await cors(req, res) // Run cors

    if (req.method === 'POST') {
      // destructure request body form
      const { name, email, password } = req.body as TRegisterApiSchema

      // hash password with bcrypt
      const hash = hashSync(password, 10)

      // store hashed password in database
      const userDoc = await UserModel.create({ name, email, password: hash })

      // set JWT token to cookie in headers
      setAuthCookie(
        {
          sub: userDoc._id,
          role: userDoc.role,
          name: userDoc.name,
          email: userDoc.email,
          createdAt: userDoc.createdAt,
          updatedAt: userDoc.updatedAt,
        },
        res
      )

      // register SUCCESS +++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Register success',
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

export default withYup(registerApiSchema, connectMongo(handler))
