import Cors from 'cors'
// files
import nc from 'middlewares/nc'
import withMongoConnect from 'middlewares/withMongoConnect'

// TODO: implement refresh token
export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['POST'],
    })
  )
  .use(withMongoConnect()) // connect mongodb middleware
  .post(async (_, res) => {
    res.status(501).json({ error: true, message: 'Not yet implemented' })
  })
