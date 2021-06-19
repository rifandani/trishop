import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import getQueryAsString from 'utils/getQueryAsString'
import ReviewModel from 'mongo/models/Review'
import ProductModel from 'mongo/models/Product'
import connectMongo from 'middlewares/connectMongo'
import checkObjectId from 'middlewares/checkObjectId'
import withYup from 'middlewares/withYup'
import checkAuthCookie from 'middlewares/checkAuthCookie'
import initMiddleware from 'middlewares/initMiddleware'
import { putReviewApiSchema, TPutReviewApiSchema } from 'yup/apiSchema'

const cors = initMiddleware(
  Cors({
    methods: ['PUT', 'DELETE'],
  })
)

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await cors(req, res) // Run cors

    if (req.method === 'PUT') {
      /* -------------------------------------------------------------------------- */
      /*                       PUT req => /user/reviews/:_id                      */
      /* -------------------------------------------------------------------------- */

      // get reviewId
      const reviewId = getQueryAsString(req.query._id)

      const { reviewerName, comment, star } = req.body as TPutReviewApiSchema

      // update review
      await ReviewModel.findByIdAndUpdate(reviewId, {
        reviewerName,
        comment,
        star,
      })

      // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, message: 'Review updated' })
    } else if (req.method === 'DELETE') {
      /* -------------------------------------------------------------------------- */
      /*                        DELETE req => /user/reviews/:_id                   */
      /* -------------------------------------------------------------------------- */

      // get id
      const reviewId = getQueryAsString(req.query._id)

      // get review by reviewId
      const reviewDoc = await ReviewModel.findById(reviewId)

      // delete review reference in Product.reviews collection
      // https://docs.mongodb.com/manual/reference/operator/update/pullAll/
      await ProductModel.findByIdAndUpdate(reviewDoc.productRef, {
        $pullAll: { reviews: [reviewId] },
      })

      // delete review by reviewId in Review collection
      await ReviewModel.findByIdAndDelete(reviewId)

      // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, message: 'Review deleted' })
    } else {
      // client error => METHOD NOT ALLOWED -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only supports PUT, DELETE method',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default checkAuthCookie(
  connectMongo(checkObjectId(ReviewModel, withYup(putReviewApiSchema, handler)))
)
