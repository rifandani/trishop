/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { verify, TokenExpiredError } from 'jsonwebtoken'

// next API middleware
const checkAuthCookie =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(
      req.cookies.auth,
      process.env.MY_SECRET_KEY,
      async (err, decoded) => {
        if (err instanceof TokenExpiredError) {
          // if access token expired
          res.status(401).json({
            error: true,
            message: 'Unauthorized! Access Token was expired',
          })
          return
        } else if (err && !decoded) {
          // if not authenticated
          res.status(401).json({
            error: true,
            message: 'Unauthorized! You are Not Authenticated',
          })
          return
        }

        // next()
        return await fn(req, res)
      }
    )
  }

export default checkAuthCookie
