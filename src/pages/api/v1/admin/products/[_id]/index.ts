import { NextApiRequest, NextApiResponse } from 'next'
// files
import getQueryAsString from 'utils/getQueryAsString'
import ProductModel from 'mongo/models/Product'
import checkObjectId from 'middlewares/checkObjectId'
import withYup from 'middlewares/withYup'
import connectMongo from 'middlewares/connectMongo'
import { isValidObjectId } from 'mongoose'
import { productApiSchema, TProductApiSchema } from 'yup/apiSchema'

// TODO: add authentication middleware for all ADMIN api's
const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                       GET req => /admin/products/:_id                      */
      /* -------------------------------------------------------------------------- */

      // get productId
      const productId = getQueryAsString(req.query._id)

      // get product by productId & populate 'reviews'
      const productDoc = await ProductModel.findById(productId)
        .populate('reviews')
        .exec()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, product: productDoc })
    } else if (req.method === 'PUT') {
      /* -------------------------------------------------------------------------- */
      /*                       PUT req => /admin/products/:_id                      */
      /* -------------------------------------------------------------------------- */

      // get productId
      const productId = getQueryAsString(req.query._id)

      const { title, price, stock, desc, labels, images } =
        req.body as TProductApiSchema

      // update product
      await ProductModel.findByIdAndUpdate(productId, {
        title,
        price,
        stock,
        desc,
        labels,
        images,
      })

      // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, message: 'Product updated' })
    } else if (req.method === 'DELETE') {
      /* -------------------------------------------------------------------------- */
      /*                       DELETE req => /admin/products/:_id                   */
      /* -------------------------------------------------------------------------- */

      // get productId
      const productId = getQueryAsString(req.query._id)

      // delete product
      await ProductModel.findByIdAndDelete(productId)

      // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, message: 'Product deleted' })
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET, PUT, DELETE method',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default checkObjectId(
  // @ts-ignore
  ProductModel,
  withYup(productApiSchema, connectMongo(handler))
)
