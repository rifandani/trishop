import { NextApiRequest, NextApiResponse } from 'next'
// files
import getQueryAsString from 'utils/getQueryAsString'
import ProductModel from 'mongo/models/Product'
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

      // check id validity
      const productId = getQueryAsString(req.query._id)
      const productIdIsValid = isValidObjectId(productId)
      if (!productIdIsValid) {
        // GET client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'productId is not a valid ObjectId' })
        return
      }

      // find existing product
      const productIsExists = await ProductModel.exists({ _id: productId })
      if (!productIsExists) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message:
            'productId is a valid ObjectId, but can not find the product. Maybe it is already deleted',
        })
        return
      }

      // get product by productId
      const product = await ProductModel.findById(productId)

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, product })
    } else if (req.method === 'PUT') {
      /* -------------------------------------------------------------------------- */
      /*                       PUT req => /admin/products/:_id                      */
      /* -------------------------------------------------------------------------- */

      // check productId validity
      const productId = getQueryAsString(req.query._id)
      const productIdIsValid = isValidObjectId(productId)
      if (!productIdIsValid) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'productId is not a valid ObjectId' })
        return
      }

      const { title, price, stock, desc, labels, images } =
        req.body as TProductApiSchema

      // find existing product
      const productIsExists = await ProductModel.exists({ _id: productId })
      if (!productIsExists) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message:
            'productId is a valid ObjectId, but can not find the product. Maybe it is already deleted',
        })
        return
      }

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

      // check productId validity
      const productId = getQueryAsString(req.query._id)
      const productIdIsValid = isValidObjectId(productId)
      if (!productIdIsValid) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'productId is not a valid ObjectId' })
        return
      }

      // find existing product
      const productIsExists = await ProductModel.exists({ _id: productId })
      if (!productIsExists) {
        // PUT client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message:
            'productId is a valid ObjectId, but can not find the product. Maybe it is already deleted',
        })
        return
      }

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

export default withYup(productApiSchema, connectMongo(handler))
