import { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
// files
import ProductModel from 'mongo/models/Product'
import getQueryAsString from 'utils/getQueryAsString'
import connectMongo from 'middlewares/connectMongo'
import withYup from 'middlewares/withYup'
import { productApiSchema } from 'yup/apiSchema'

// TODO: add authentication middleware for all ADMIN api's
const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  /* -------------------------------------------------------------------------- */
  /*     GET req => /admin/products & /admin/products?productId={productId}     */
  /* -------------------------------------------------------------------------- */
  if (req.method === 'GET') {
    try {
      // there is no query => GET /admin/products
      if (Object.keys(req.query).length === 0) {
        const products = await ProductModel.find()

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json({ error: false, products })
        return
      }

      // there is query
      // check id validity
      const productId = getQueryAsString(req.query.productId)
      const productIdIsValid = isValidObjectId(productId)
      if (!productIdIsValid) {
        // GET client error => Bad Request -----------------------------------------------------------------
        res
          .status(400)
          .json({ error: true, message: 'productId is not a valid ObjectId' })
        return
      }

      // get product by productId
      const product = await ProductModel.findById(productId)

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, product })
    } catch (err) {
      // GET server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    /* -------------------------------------------------------------------------- */
    /*                         POST req => /admin/products                        */
    /* -------------------------------------------------------------------------- */
  } else if (req.method === 'POST') {
    const { title, price, stock, desc, labels, images } = req.body

    try {
      // create new product to mongodb
      await ProductModel.create({
        title,
        price,
        stock,
        desc,
        labels,
        images,
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, message: 'Product created' })
    } catch (err) {
      // POST server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    /* -------------------------------------------------------------------------- */
    /*              PUT req => /admin/products?productId={productId}              */
    /* -------------------------------------------------------------------------- */
  } else if (req.method === 'PUT') {
    // check productId validity
    const productId = getQueryAsString(req.query.productId)
    const productIdIsValid = isValidObjectId(productId)
    if (!productIdIsValid) {
      // PUT client error => Bad Request -----------------------------------------------------------------
      res
        .status(400)
        .json({ error: true, message: 'productId is not a valid ObjectId' })
      return
    }

    const { title, price, stock, desc, labels, images } = req.body

    try {
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
    } catch (err) {
      // PUT server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    /* -------------------------------------------------------------------------- */
    /*              DELETE req => /admin/products?productId={productId}              */
    /* -------------------------------------------------------------------------- */
  } else if (req.method === 'DELETE') {
    // check productId validity
    const productId = getQueryAsString(req.query.productId)
    const productIdIsValid = isValidObjectId(productId)
    if (!productIdIsValid) {
      // PUT client error => Bad Request -----------------------------------------------------------------
      res
        .status(400)
        .json({ error: true, message: 'productId is not a valid ObjectId' })
      return
    }

    try {
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
    } catch (err) {
      // server error => internal server error ----------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      })
    }
  } else {
    // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
    res.status(405).json({
      error: true,
      message: 'Only supports GET, POST, PUT, DELETE method',
    })
  }
}

export default withYup(productApiSchema, connectMongo(handler))
