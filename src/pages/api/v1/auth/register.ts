import { hashSync } from 'bcryptjs'
import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'
import withYupConnect from 'middlewares/withYupConnect'
import UserModel from 'mongo/models/User'
import setAuthCookie from 'utils/setAuthCookie'
import { registerApiSchema, TRegisterApiSchema } from 'yup/apiSchema'

export default nc
  .use(withCors(['POST'])) // cors
  .use(withMongoConnect()) // connect mongodb
  .use(withYupConnect(registerApiSchema)) // yup
  .post('/api/v1/auth/register', async (req, res) => {
    // destructure request body form
    const { name, email, password } = req.body as TRegisterApiSchema

    // check if there is already existing email
    const emailIsExists = await UserModel.exists({ email })

    // client error => email already exists -----------------------------------------------------------------
    if (emailIsExists) {
      res.status(400).json({ error: true, message: 'Email already exists' })
      return
    }

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
        iss: 'Trishop',
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
