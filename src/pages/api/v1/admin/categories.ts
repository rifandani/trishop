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
      // get all products
      const products = await ProductModel.find()

      const x: string[] = []

      const labels = products.map((product) => product.labels)
      labels.forEach((label: string[]) => {
        label.forEach((el: string) => x.push(el))
      })

      const categories = [...new Set(x)] // filter duplicate value in array

      // JSON response => [category] ---------------------------------------- OK
      return res.status(200).json(categories)
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports GET methods',
      })
    }
  } catch (err) {
    // server error => internal server error ----------------------------------------
    res.status(500).json({
      error: true,
      name: err.name,
      message: err.message,
    })
  }
}

export default connectMongo(handler)
