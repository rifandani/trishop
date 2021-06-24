/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextHandler } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { verify, TokenExpiredError } from 'jsonwebtoken'
// files
import { AuthCookiePayload } from 'types'

const withCheckAuthCookie =
  () =>
  async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    verify(
      req.cookies.auth,
      process.env.MY_SECRET_KEY,
      async (err, decoded) => {
        // 401 -> Unauthorized error
        if (err instanceof TokenExpiredError) {
          res.status(401).json({
            error: true,
            name: 'TokenExpiredError',
            message: 'Unauthorized! Access token was expired',
          })
          return
        } else if (err && !decoded) {
          res.status(401).json({
            error: true,
            name: 'NotAuthenticated',
            message: 'Unauthorized! You are not authenticated',
          })
          return
        }

        const decodedToken = decoded as AuthCookiePayload

        // if not admin
        if (decodedToken.role !== 'ADMIN') {
          res.status(401).json({
            error: true,
            name: 'NotAdmin',
            message: 'Unauthorized! You are not admin',
          })
          return
        }

        // continue ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        return next()
      }
    )
  }

export default withCheckAuthCookie
