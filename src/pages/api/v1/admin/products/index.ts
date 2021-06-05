import { NextApiRequest, NextApiResponse } from 'next'
// files
import ProductModel from 'mongo/models/Product'
import connectMongo from 'middlewares/connectMongo'
import withYup from 'middlewares/withYup'
import { productApiSchema, TProductApiSchema } from 'yup/apiSchema'

// TODO: add authentication middleware for all ADMIN api's
const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                         GET req => /admin/products                         */
      /* -------------------------------------------------------------------------- */

      const products = await ProductModel.find()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, products, count: products.length })
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
        message: 'Only supports GET, POST, DELETE method',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default withYup(productApiSchema, connectMongo(handler))
