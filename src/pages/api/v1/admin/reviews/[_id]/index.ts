import { NextApiRequest, NextApiResponse } from 'next'
// files
import getQueryAsString from 'utils/getQueryAsString'
import ReviewModel from 'mongo/models/Review'
import ProductModel from 'mongo/models/Product'
import connectMongo from 'middlewares/connectMongo'
import checkObjectId from 'middlewares/checkObjectId'
import withYup from 'middlewares/withYup'
import { putReviewApiSchema, TPutReviewApiSchema } from 'yup/apiSchema'

// TODO: add authentication middleware for all ADMIN api's
const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                       GET req => /admin/reviews/:_id                      */
      /* -------------------------------------------------------------------------- */

      // get id
      const reviewId = getQueryAsString(req.query._id)

      // get review by reviewId
      const reviewDoc = await ReviewModel.findById(reviewId) // .populate('productRef').exec()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, review: reviewDoc })
    } else if (req.method === 'PUT') {
      /* -------------------------------------------------------------------------- */
      /*                       PUT req => /admin/reviews/:_id                      */
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
      /*                        DELETE req => /admin/reviews/:_id                   */
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
  ReviewModel,
  withYup(putReviewApiSchema, connectMongo(handler))
)
