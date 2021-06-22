import Cors from 'cors'
import { hashSync } from 'bcrypt'
// files
import nc from 'middlewares/nc'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withYupConnect from 'middlewares/withYupConnect'
import withMongoConnect from 'middlewares/withMongoConnect'
import UserModel from 'mongo/models/User'
import { userApiSchema } from 'yup/apiSchema'

export default nc
  // cors, middleware 1
  .use(
    Cors({
      methods: ['GET', 'POST'],
    })
  )
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie middleware
  .use(withYupConnect(userApiSchema)) // yup middleware
  .use(withMongoConnect()) // connect mongodb middleware
  /* ----------------------------------- GET req => /admin/users ---------------------------------- */
  .get(async (req, res) => {
    // there is no query for filtering & sorting
    if (Object.keys(req.query).length === 0) {
      const users = await UserModel.find()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, users, count: users.length })
      return
    }

    // const customQuery = req.query
  })
  /* ---------------------------------- POST req => /admin/users ---------------------------------- */
  .post(async (req, res) => {
    const { name, role, email, password } = req.body

    // hash password with bcrypt
    const hash = hashSync(password, 10)

    // store hashed password in database
    const user = await UserModel.create({
      name,
      role,
      email,
      password: hash,
    })

    // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({ error: false, userId: user._id })
  })
