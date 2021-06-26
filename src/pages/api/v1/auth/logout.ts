import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import unsetAuthCookie from 'utils/unsetAuthCookie'

export default nc
  .use(withCors(['GET'])) // cors
  .get(async (_req, res) => {
    // remove cookies by setting expires to new Date(0)
    unsetAuthCookie(res)

    // res.writeHead(302, { Location: '/api/auth/login' });
    // res.end();

    // logout SUCCESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({
      error: false,
      message: 'Logout success',
    })
  })
