import dbConnect from 'mongo/config/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

const withMongoConnect =
  () =>
  async (_req: NextApiRequest, _res: NextApiResponse, next: NextHandler) => {
    await dbConnect()

    // continue ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    next()
  }

export default withMongoConnect
