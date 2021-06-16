import { NextApiRequest, NextApiResponse } from 'next'
// files
import getQueryAsString from 'utils/getQueryAsString'
import ProductModel from 'mongo/models/Product'
import ReviewModel from 'mongo/models/Review'
import checkObjectId from 'middlewares/checkObjectId'
import connectMongo from 'middlewares/connectMongo'

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                       GET req => /public/products/:_id                      */
      /* -------------------------------------------------------------------------- */

      // get productId
      const productId = getQueryAsString(req.query._id)

      // get product by productId & populate 'reviews'
      const productDoc = await ProductModel.findById(productId)
        .populate({
          path: 'reviews',
          model: ReviewModel, // reference the model, or it will throw an Error
        })
        .exec()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, product: productDoc })
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

export default checkObjectId(ProductModel, connectMongo(handler))
