import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
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
    } else {
      // client error => Method Not Allowed -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only support GET req',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({
      error: true,
      name: err.name,
      message: err.message,
    })
  }
}

export default handler
