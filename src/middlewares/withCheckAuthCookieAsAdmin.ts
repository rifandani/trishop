/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextHandler } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { verify, TokenExpiredError } from 'jsonwebtoken'
// files
import { AuthCookiePayload } from 'types'

const withCheckAuthCookie =
  () => (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    verify(
      req.cookies.auth,
      process.env.MY_SECRET_KEY,
      (err, decoded: AuthCookiePayload) => {
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

        // if not admin
        if (decoded.role !== 'ADMIN') {
          res.status(401).json({
            error: true,
            name: 'NotAdmin',
            message: 'Unauthorized! You are not admin',
          })
          return
        }

        // continue ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        next()
      }
    )
  }

export default withCheckAuthCookie
