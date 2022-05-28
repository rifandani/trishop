import { NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
// files
import { AuthCookiePayload } from 'types'

const setAuthCookie = function (
  authCookiePayload: AuthCookiePayload,
  res: NextApiResponse
): void {
  // sign JWT token
  const jwt = sign(authCookiePayload, process.env.MY_SECRET_KEY, {
    expiresIn: '3h',
  })

  // set cookie to response header
  res.setHeader(
    'Set-Cookie',
    // seperti JSON.stringify untuk cookies
    serialize('auth', jwt, {
      secure: process.env.NODE_ENV !== 'development',
      path: '/', // make it available everywhere, not only in routes that call this setAuthCookie function
      httpOnly: true, // means client side javascript can NOT access our cookies
      maxAge: 60 * 60 * 3, // 3 hour
      sameSite: 'strict', // Kalau 'strict' restricted ke domain https://trishop.vercel.app
      // domain: process.env.NODE_ENV !== 'development' ? 'vercel.app' : '',
    })
  )
}

export default setAuthCookie
