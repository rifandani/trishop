import { NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

export interface JWTPayload {
  sub: string // subject, whom the token refers to
  role: 'USER' | 'ADMIN'
  iat?: number
  exp?: number
}

export default function setCookie(
  payload: JWTPayload,
  res: NextApiResponse
): void {
  // sign JWT token
  // const payload = {
  // sub: user._id, // reserved word sub == subject
  // userEmail: user.email,
  // iat: Math.floor(Date.now() / 1000), // reserved word iat == issuedAt
  // };

  const jwt = sign(payload, process.env.MY_SECRET_KEY, { expiresIn: '3h' })

  // set cookie to response header
  res.setHeader(
    'Set-Cookie',
    // seperti JSON.stringify untuk cookies
    serialize('auth', jwt, {
      httpOnly: true, // means client side javascript can NOT access our cookies
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 3, // 3 hour
      path: '/', // make it available everywhere, not only in /api
    })
  )
}
