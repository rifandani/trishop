import { NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
// files
import { RefreshTokenCookiePayload } from 'types'

// TODO: setRefreshTokenCookie
const setRefreshTokenCookie = function (
  refreshTokenCookiePayload: RefreshTokenCookiePayload,
  res: NextApiResponse
): void {
  // sign JWT token
  const jwt = sign(refreshTokenCookiePayload, process.env.MY_SECRET_KEY, {
    expiresIn: '24h',
  })

  // set cookie to response header
  res.setHeader(
    'Set-Cookie',
    // seperti JSON.stringify untuk cookies
    serialize('refreshtoken', jwt, {
      httpOnly: true, // means client side javascript can NOT access our cookies
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hour
      path: '/', // make it available everywhere, not only in routes that call this setAuthCookie function
    })
  )
}

export default setRefreshTokenCookie
