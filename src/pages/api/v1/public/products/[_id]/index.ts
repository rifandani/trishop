import nc from 'middlewares/nc'
import withCheckObjectId from 'middlewares/withCheckObjectId'
import withCors from 'middlewares/withCors'
import withMongoConnect from 'middlewares/withMongoConnect'
import ProductModel from 'mongo/models/Product'
import ReviewModel from 'mongo/models/Review'
import getQueryAsString from 'utils/getQueryAsString'

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
