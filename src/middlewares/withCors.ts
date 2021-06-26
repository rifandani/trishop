/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Cors from 'cors'
import { NextHandler } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

const withCors =
  (methods: string[]) =>
  (_req: NextApiRequest, _res: NextApiResponse, next: NextHandler) => {
    Cors({ methods })

    // continue ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    next()
  }

export default withCors
