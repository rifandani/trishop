import Cors from 'cors'
import { compare } from 'bcrypt'
// files
import withMongoConnect from 'middlewares/withMongoConnect'
import withYupConnect from 'middlewares/withYupConnect'
import nc from 'middlewares/nc'
import UserModel from 'mongo/models/User'
import { setAuthCookie } from 'utils/setCookie'
import { loginApiSchema, TLoginApiSchema } from 'yup/apiSchema'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['POST'],
    })
  )
  .use(withMongoConnect()) // connect mongodb middleware
  .use(withYupConnect(loginApiSchema)) // yup middleware
  .post(async (req, res) => {
    // destructure request body form
    const { email, password } = req.body as TLoginApiSchema

    // check if user with that email exists
    const emailIsExists = await UserModel.exists({ email })

    if (!emailIsExists) {
      // client error => email does not exists -----------------------------------------------------------------
      res.status(400).json({ error: true, message: 'Email does not exists' })
      return
    }

    // find specific user
    const userDoc = await UserModel.findOne({ email })

    const isMatch = await compare(password, userDoc.password)

    if (!isMatch) {
      // client error => password did not match -----------------------------------------------------------------
      res.status(400).json({ error: true, message: 'Password did not match' })
      return
    }

    // sign JWT and set it to cookie in header
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
  })
