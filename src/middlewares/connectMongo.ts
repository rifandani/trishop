import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// files
import dbConnect from 'mongo/config/dbConnect'

// connect mongodb middleware
const connectMongo =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await dbConnect()

      // next()
      await fn(req, res)
    } catch (err) {
      // mongo connection error
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
      return
    }
  }

export default connectMongo
