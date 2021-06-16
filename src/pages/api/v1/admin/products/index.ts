import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import ProductModel from 'mongo/models/Product'
import connectMongo from 'middlewares/connectMongo'
import withYup from 'middlewares/withYup'
import checkAuthCookie from 'middlewares/checkAuthCookie'
import initMiddleware from 'middlewares/initMiddleware'
import { productApiSchema, TProductApiSchema } from 'yup/apiSchema'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
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
      /*                         GET req => /admin/products                         */
      /* -------------------------------------------------------------------------- */

      // there is no query for filtering & sorting
      if (Object.keys(req.query).length === 0) {
        const products = await ProductModel.find()

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({ error: false, products, count: products.length })
        return
      }

      // const customQuery = req.query
    } else if (req.method === 'POST') {
      /* -------------------------------------------------------------------------- */
      /*                         POST req => /admin/products                        */
      /* -------------------------------------------------------------------------- */

      const { title, price, stock, desc, labels, images } =
        req.body as TProductApiSchema

      // create new product to mongodb
      const product = await ProductModel.create({
        title,
        price,
        stock,
        desc,
        labels,
        images,
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, productId: product._id })
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, POST method',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default checkAuthCookie(withYup(productApiSchema, connectMongo(handler)))
