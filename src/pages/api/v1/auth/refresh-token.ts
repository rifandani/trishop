import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'

// TODO: implement refresh token
export default nc
  .use(withCors(['POST'])) // cors
  .use(withMongoConnect()) // connect mongodb middleware
  .post('/api/v1/auth/refreshtoken', async (_req, res) => {
    res.status(501).json({ error: true, message: 'Not yet implemented' })
  })
