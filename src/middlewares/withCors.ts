import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

const withCors =
  (methods: string[]) =>
  (_req: NextApiRequest, _res: NextApiResponse, next: NextHandler) => {
    Cors({ methods })

    // continue ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    next()
  }

export default withCors
