import { NextApiRequest, NextApiResponse } from 'next'
import { hashSync } from 'bcrypt'
// files
import UserModel from 'mongo/models/User'
import connectMongo from 'middlewares/connectMongo'
import withYup from 'middlewares/withYup'
import { userApiSchema } from 'yup/apiSchema'

// TODO: add authentication middleware for all ADMIN api's
const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                           GET req => /admin/users                          */
      /* -------------------------------------------------------------------------- */

      // there is no query for filtering & sorting
      if (Object.keys(req.query).length === 0) {
        const users = await UserModel.find()

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({ error: false, users, count: users.length })
        return
      }

      const customQuery = req.query
    } else if (req.method === 'POST') {
      /* -------------------------------------------------------------------------- */
      /*                          POST req => /admin/users                          */
      /* -------------------------------------------------------------------------- */

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
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, POST methods',
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

export default withYup(userApiSchema, connectMongo(handler))
