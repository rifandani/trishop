import { NextApiRequest, NextApiResponse } from 'next'
import { hashSync } from 'bcrypt'
// files
import getQueryAsString from 'utils/getQueryAsString'
import UserModel from 'mongo/models/User'
import checkObjectId from 'middlewares/checkObjectId'
import connectMongo from 'middlewares/connectMongo'
import withYup from 'middlewares/withYup'
import { userApiSchema } from 'yup/apiSchema'

// TODO: add authentication middleware for all ADMIN api's
const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                        GET req => /admin/users/:_id                        */
      /* -------------------------------------------------------------------------- */

      // check id validity
      const userId = getQueryAsString(req.query._id)

      // find user by id
      const user = await UserModel.findById(userId)

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, user })
    } else if (req.method === 'PUT') {
      /* -------------------------------------------------------------------------- */
      /*                        PUT req => /admin/users/:_id                        */
      /* -------------------------------------------------------------------------- */

      // check id validity
      const userId = getQueryAsString(req.query._id)

      const { name, role, email, password } = req.body

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
    } else if (req.method === 'DELETE') {
      /* -------------------------------------------------------------------------- */
      /*                        DELETE req => /admin/users/:_id                        */
      /* -------------------------------------------------------------------------- */

      // check id validity
      const userId = getQueryAsString(req.query._id)

      // delete user by id
      await UserModel.findByIdAndDelete(userId)

      // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, message: 'User deleted' })
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, PUT, DELETE methods',
      })
    }
  } catch (err) {
    // server error => internal server error ----------------------------------------
    res.status(500).json({
      error: true,
      name: err.name,
      message: err.message,
    })
  }
}

export default checkObjectId(
  // @ts-ignore
  UserModel,
  withYup(userApiSchema, connectMongo(handler))
)