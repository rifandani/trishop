import Cors from 'cors'
// files
import nc from 'middlewares/nc'
import getQueryAsString from 'utils/getQueryAsString'
import ProductModel from 'mongo/models/Product'
import ReviewModel from 'mongo/models/Review'
import withMongoConnect from 'middlewares/withMongoConnect'
import withCheckObjectId from 'middlewares/withCheckObjectId'

export default nc
  // cors, middleware 1
  .use(
    Cors({
      methods: ['GET'],
    })
  )
  .use(withMongoConnect()) // connet mongodb, middleware 2
  .use(withCheckObjectId(ProductModel)) // check objectId query validity, middleware 3
  /* ------------------------------ GET req => /public/products/:_id ------------------------------ */
  .get(async (req, res) => {
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
