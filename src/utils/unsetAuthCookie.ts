import { serialize } from 'cookie'
import { NextApiResponse } from 'next'

const unsetAuthCookie = function (res: NextApiResponse): void {
  // remove cookies by setting expires to new Date(0)
  res.setHeader(
    'Set-Cookie',
    serialize('auth', '', {
      expires: new Date(0), // here we set expires to 0
      secure: process.env.NODE_ENV !== 'development',
      path: '/', // make it available everywhere, not only in routes that call this setAuthCookie function
      httpOnly: true, // means client side javascript can NOT access our cookies
      sameSite: 'strict', // Kalau 'strict' restricted ke domain https://trishop.vercel.app
    })
  )
}

export default unsetAuthCookie
