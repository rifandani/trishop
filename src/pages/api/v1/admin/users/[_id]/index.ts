import { NextApiRequest, NextApiResponse } from 'next'
import { hashSync } from 'bcrypt'
import { isValidObjectId } from 'mongoose'
// files
import getQueryAsString from 'utils/getQueryAsString'
import UserModel from 'mongo/models/User'
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
      const userIdIsValid = isValidObjectId(userId)
      if (!userIdIsValid) {
        // GET client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'userId is not a valid ObjectId' })
        return
      }

      // find existing user
      const userIsExists = await UserModel.exists({ _id: userId })
      if (!userIsExists) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message:
            'userId is a valid ObjectId, but can not find the user. Maybe it is already deleted',
        })
        return
      }

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
      const userIdIsValid = isValidObjectId(userId)
      if (!userIdIsValid) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'userId is not a valid ObjectId' })
        return
      }

      const { name, role, email, password } = req.body

      // find existing user
      const userIsExists = await UserModel.exists({ _id: userId })
      if (!userIsExists) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message:
            'userId is a valid ObjectId, but can not find the user. Maybe it is already deleted',
        })
        return
      }

      // hash new password with bcrypt
      const newHash = hashSync(password, 10)

      // update user
      await UserModel.findByIdAndUpdate(userId, {
        name,
        role,
        email,
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
      const userIdIsValid = isValidObjectId(userId)
      if (!userIdIsValid) {
        // DELETE client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'userId is not a valid ObjectId' })
        return
      }

      // find existing user
      const userIsExists = await UserModel.exists({ _id: userId })
      if (!userIsExists) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message:
            'userId is a valid ObjectId, but can not find the user. Maybe it is already deleted',
        })
        return
      }

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

export default withYup(userApiSchema, connectMongo(handler))
