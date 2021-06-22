import Cors from 'cors'
import { hashSync } from 'bcrypt'
// files
import nc from 'middlewares/nc'
import UserModel from 'mongo/models/User'
import withYupConnect from 'middlewares/withYupConnect'
import withMongoConnect from 'middlewares/withMongoConnect'
import { setAuthCookie } from 'utils/setCookie'
import { registerApiSchema, TRegisterApiSchema } from 'yup/apiSchema'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['POST'],
    })
  )
  .use(withMongoConnect()) // connect mongodb middleware
  .use(withYupConnect(registerApiSchema)) // yup middleware
  .post(async (req, res) => {
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
  })
