import { compareSync } from 'bcryptjs'
import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'
import withYupConnect from 'middlewares/withYupConnect'
import UserModel from 'mongo/models/User'
import setAuthCookie from 'utils/setAuthCookie'
import { loginApiSchema, TLoginApiSchema } from 'yup/apiSchema'

export default nc
  .use(withCors(['POST'])) // cors
  .use(withMongoConnect()) // connect mongodb
  .use(withYupConnect(loginApiSchema)) // yup
  .post('/api/v1/auth/login', async (req, res) => {
    // destructure request body form
    const { email, password } = req.body as TLoginApiSchema

    // check if user with that email exists
    const emailIsExists = await UserModel.exists({ email })

    // client error => email does not exists -----------------------------------------------------------------
    if (!emailIsExists) {
      res.status(400).json({ error: true, message: 'Email does not exists' })
      return
    }

    // find specific user
    const userDoc = await UserModel.findOne({ email })

    // compare req.body.password with user password from mongodb
    const isMatch = compareSync(password, userDoc.password)

    // client error => password did not match -----------------------------------------------------------------
    if (!isMatch) {
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
        iss: 'Trishop',
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
