/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextHandler } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import dbConnect from 'mongo/config/dbConnect'

const withMongoConnect =
  () =>
  async (_req: NextApiRequest, _res: NextApiResponse, next: NextHandler) => {
    await dbConnect()

    // continue ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    next()
  }

export default withMongoConnect
