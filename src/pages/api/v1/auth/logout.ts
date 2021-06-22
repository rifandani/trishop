import Cors from 'cors'
import { serialize } from 'cookie'
// files
import nc from 'middlewares/nc'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['GET'],
    })
  )
  .get(async (_, res) => {
    // remove cookies from request header by setting it to 0
    res.setHeader(
      'Set-Cookie',
      serialize('auth', '', {
        httpOnly: true, // klo true berarti client side javascript can't access our cookies (PENTING)
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0), // here we set expires to 0
        path: '/',
      })
    )

    // res.writeHead(302, { Location: '/api/auth/login' });
    // res.end();

    // logout SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({
      error: false,
      message: 'Logout success',
    })
  })
