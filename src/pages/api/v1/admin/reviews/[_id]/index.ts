import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withMongoConnect from 'middlewares/withMongoConnect'
import withCheckObjectId from 'middlewares/withCheckObjectId'
import getQueryAsString from 'utils/getQueryAsString'
import ReviewModel from 'mongo/models/Review'
import ProductModel from 'mongo/models/Product'

export default nc
  .use(withCors(['DELETE'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie
  .use(withMongoConnect()) // connect mongodb
  .use(withCheckObjectId(ReviewModel)) // check query object id
  .delete('/api/v1/admin/reviews/:_id', async (req, res) => {
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
