import Cors from 'cors'
import { hashSync } from 'bcrypt'
// files
import nc from 'middlewares/nc'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withYupConnect from 'middlewares/withYupConnect'
import withMongoConnect from 'middlewares/withMongoConnect'
import withCheckObjectId from 'middlewares/withCheckObjectId'
import getQueryAsString from 'utils/getQueryAsString'
import UserModel from 'mongo/models/User'
import { userApiSchema, TUserApiSchema } from 'yup/apiSchema'

export default nc
  // cors, middleware 1
  .use(
    Cors({
      methods: ['GET', 'PUT', 'DELETE'],
    })
  )
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie middleware
  .use(withYupConnect(userApiSchema)) // yup middleware
  .use(withMongoConnect()) // connect mongodb middleware
  .use(withCheckObjectId(UserModel)) // check query object id middleware
  /* -------------------------------- GET req => /admin/users/:_id -------------------------------- */
  .get(async (req, res) => {
    // check id validity
    const userId = getQueryAsString(req.query._id)

    // find user by id
    const user = await UserModel.findById(userId)

    // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, user })
  })
  /* -------------------------------- PUT req => /admin/users/:_id -------------------------------- */
  .put(async (req, res) => {
    // check id validity
    const userId = getQueryAsString(req.query._id)

    const { name, role, email, password } = req.body as TUserApiSchema

    // hash new password with bcrypt
    const newHash = hashSync(password, 10)

    // update user
    await UserModel.findByIdAndUpdate(userId, {
      name,
      email,
      role,
      password: newHash,
    })

    // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({ error: false, message: 'User updated' })
  })
  /* ------------------------------- DELETE req => /admin/users/:_id ------------------------------ */
  .delete(async (req, res) => {
    // check id validity
    const userId = getQueryAsString(req.query._id)

    // delete user by id
    await UserModel.findByIdAndDelete(userId)

    // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, message: 'User deleted' })
  })
