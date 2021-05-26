import { NextApiRequest, NextApiResponse } from 'next'
// files
import MongoConfig from 'mongo/config/MongoConfig'
import Product from 'mongo/models/Product'

export default async function getProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // connect db
  const conn = await MongoConfig.connectDB()

  if (req.method === 'GET') {
    try {
      // get specific product
      const product = await Product.findById(req.query._id)

      // JSON response => product ---------------------------------------- OK
      res.status(200).json(product)
    } catch (err) {
      // error 400 => BAD REQUEST
      res.status(400).json({
        error: true,
        message: 'Bad request. Please, input a valid product id.',
      })
    }
  } else {
    // error 405 => METHOD NOT ALLOWED
    res.status(405).json({
      error: true,
      message: 'Only supports GET method',
    })
  }
}
