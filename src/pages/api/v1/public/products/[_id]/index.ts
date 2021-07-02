import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import getQueryAsString from 'utils/getQueryAsString'
import ProductModel from 'mongo/models/Product'
import ReviewModel from 'mongo/models/Review'
import withMongoConnect from 'middlewares/withMongoConnect'
import withCheckObjectId from 'middlewares/withCheckObjectId'

export default nc
  .use(withCors(['GET'])) // cors
  .use(withMongoConnect()) // connect mongodb
  .use(withCheckObjectId(ProductModel)) // check objectId query validity
  .get('/api/v1/public/products/:_id', async (req, res) => {
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
  })
