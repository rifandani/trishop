import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import ProductModel from 'mongo/models/Product'
import connectMongo from 'middlewares/connectMongo'
import initMiddleware from 'middlewares/initMiddleware'

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
  })
)

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await cors(req, res) // Run cors

    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                         GET req => /public/products                         */
      /* -------------------------------------------------------------------------- */

      // there is no query for filtering & sorting
      if (Object.keys(req.query).length === 0) {
        const products = await ProductModel.find()

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({ error: false, products, count: products.length })
        return
      }

      // const customQuery = req.query
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET method',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default connectMongo(handler)
