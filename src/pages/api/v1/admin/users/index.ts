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
  /* -------------------------------------------------------------------------- */
  /*           GET req => /admin/users & /admin/users?userId={userId}           */
  /* -------------------------------------------------------------------------- */
  if (req.method === 'GET') {
    try {
      // there is no query => GET /admin/users
      if (Object.keys(req.query).length === 0) {
        const users = await UserModel.find()

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({ error: false, users })
        return
      }

      // there is query => GET /admin/users?userId={userId}
      // check id validity
      const userId = getQueryAsString(req.query.userId)
      const userIdIsValid = isValidObjectId(userId)
      if (!userIdIsValid) {
        // GET client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'userId is not a valid ObjectId' })
        return
      }

      // find existing product
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
    } catch (err) {
      // GET server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    /* -------------------------------------------------------------------------- */
    /*                          POST req => /admin/users                          */
    /* -------------------------------------------------------------------------- */
  } else if (req.method === 'POST') {
    const { name, role, email, password } = req.body

    try {
      // hash password with bcrypt
      const hash = hashSync(password, 10)

      // store hashed password in database
      await UserModel.create({ name, role, email, password: hash })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, message: 'User created' })
    } catch (err) {
      // POST server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    /* -------------------------------------------------------------------------- */
    /*                   PUT req => /admin/users?userId={userId}                  */
    /* -------------------------------------------------------------------------- */
  } else if (req.method === 'PUT') {
    // check id validity
    const userId = getQueryAsString(req.query.userId)
    const userIdIsValid = isValidObjectId(userId)
    if (!userIdIsValid) {
      // PUT client error => Bad Request -----------------------------------------------------------------
      res
        .status(400)
        .json({ error: true, message: 'userId is not a valid ObjectId' })
      return
    }

    const { name, role, email, password } = req.body

    try {
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
    } catch (err) {
      // PUT server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    /* -------------------------------------------------------------------------- */
    /*                 DELETE req => /admin/users?userId={userId}                 */
    /* -------------------------------------------------------------------------- */
  } else if (req.method === 'DELETE') {
    // check id validity
    const userId = getQueryAsString(req.query.userId)
    const userIdIsValid = isValidObjectId(userId)
    if (!userIdIsValid) {
      // DELETE client error => Bad Request -----------------------------------------------------------------
      res
        .status(400)
        .json({ error: true, message: 'userId is not a valid ObjectId' })
      return
    }

    try {
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
    } catch (err) {
      // server error => internal server error ----------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      })
    }
  } else {
    // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
    res.status(405).json({
      error: true,
      message: 'Only supports GET, POST, PUT, DELETE methods',
    })
  }
}

export default withYup(userApiSchema, connectMongo(handler))
