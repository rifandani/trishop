import { NextApiRequest, NextApiResponse } from 'next'
// files
import MongoConfig from 'mongo/config/MongoConfig'
import Product from 'mongo/models/Product'

export default async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // connect db
  const conn = await MongoConfig.connectDB()

  if (req.method === 'GET') {
    try {
      // get all products
      const products = await Product.find()

      // JSON response => [product] ---------------------------------------- OK
      return res.status(200).json(products)
    } catch (err) {
      // error 400 => BAD REQUEST
      return res.status(400).json({ error: true, message: 'Bad request' })
    }
    // ------------------------------------------- POST
  } else if (req.method === 'POST') {
    // destructure request body form
    const { title, price, stock, desc, labels, images } = req.body

    try {
      // POST product to mongo
      const product = await Product.create({
        title,
        price,
        stock,
        desc,
        labels,
        images,
      })

      // JSON response => product ---------------------------------------- CREATED
      return res.status(201).json(product)
    } catch (err) {
      // CREATE product error => BAD REQUEST
      return res.status(400).json(err)
    }
    // ------------------------------------------- PUT
  } else if (req.method === 'PUT') {
    // destructure body requests
    const { _id, title, price, stock, desc, labels, images } = req.body

    try {
      // find existing product
      const product = await Product.findById(_id)

      // update product
      product.title = title
      product.price = price
      product.stock = stock
      product.desc = desc
      product.labels = labels
      product.images = images
      await product.save()

      // JSON response 201 => product ---------------------------------------- MODIFIED
      return res.status(201).json(product)
    } catch (err) {
      // user error 400 => BAD REQUEST
      return res.status(400).json(err)
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.body.id)

      // JSON response => deletedProduct ---------------------------------------- ACCEPTED
      return res.status(202).json(deletedProduct)
    } catch (err) {
      // DELETE product error => BAD REQUEST
      return res.status(500).json(err)
    }
  } else {
    // error 405 => METHOD NOT ALLOWED
    return res.status(405).json({
      error: true,
      message: 'Only supports GET, POST, PUT, DELETE method',
    })
  }
}
