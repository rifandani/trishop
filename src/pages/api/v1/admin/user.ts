import { NextApiRequest, NextApiResponse } from 'next'
// files
import getQueryAsString from 'utils/getQueryAsString'
import UserModel from 'mongo/models/User'
import connectMongo from 'middlewares/connectMongo'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const userId = getQueryAsString(req.query._id)

      // get user from database
      const user = await UserModel.findById(userId)

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json(user)
    } catch (err) {
      // GET server error => Internal Server Error -----------------------------------------------------------------
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
      message: 'Only supports GET method',
    })
  }
}

export default connectMongo(handler)
