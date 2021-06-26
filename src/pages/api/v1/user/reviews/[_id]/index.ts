import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'
import withYupConnect from 'middlewares/withYupConnect'
import withCheckAuthCookie from 'middlewares/withCheckAuthCookie'
import withCheckObjectId from 'middlewares/withCheckObjectId'
import ReviewModel from 'mongo/models/Review'
import ProductModel from 'mongo/models/Product'
import getQueryAsString from 'utils/getQueryAsString'
import { putReviewApiSchema, TPutReviewApiSchema } from 'yup/apiSchema'

export default nc
  .use(withCors(['PUT', 'DELETE'])) // cors
  .use(withCheckAuthCookie()) // check auth cookie middleware
  .use(withYupConnect(putReviewApiSchema)) // yup middleware
  .use(withMongoConnect()) // connect mongodb middleware
  .use(withCheckObjectId(ReviewModel)) // check query object id middleware
  /* -------------------------------- PUT req => /user/reviews/:_id ------------------------------- */
  .put(async (req, res) => {
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
  })
  /* ------------------------------ DELETE req => /user/reviews/:_id ------------------------------ */
  .delete(async (req, res) => {
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
  })
