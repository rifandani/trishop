import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withYupConnect from 'middlewares/withYupConnect'
import withMongoConnect from 'middlewares/withMongoConnect'
import withCheckObjectId from 'middlewares/withCheckObjectId'
import getQueryAsString from 'utils/getQueryAsString'
import ProductModel from 'mongo/models/Product'
import ReviewModel from 'mongo/models/Review'
import { productApiSchema, TProductApiSchema } from 'yup/apiSchema'

export default nc
  .use(withCors(['GET', 'PUT', 'DELETE'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie middleware
  .use(withYupConnect(productApiSchema)) // yup middleware
  .use(withMongoConnect()) // connect mongodb middleware
  .use(withCheckObjectId(ProductModel)) // check query object id middleware
  /* ------------------------------- GET req => /admin/products/:_id ------------------------------ */
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
  /* ------------------------------- PUT req => /admin/products/:_id ------------------------------ */
  .put(async (req, res) => {
    // get productId
    const productId = getQueryAsString(req.query._id)

    const { title, price, stock, desc, labels, images } =
      req.body as TProductApiSchema

    // update product
    await ProductModel.findByIdAndUpdate(productId, {
      title,
      price,
      stock,
      desc,
      labels,
      images,
    })

    // PUT success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({ error: false, message: 'Product updated' })
  })
  /* ----------------------------- DELETE req => /admin/products/:_id ----------------------------- */
  .delete(async (req, res) => {
    // get productId
    const productId = getQueryAsString(req.query._id)

    // delete product
    await ProductModel.findByIdAndDelete(productId)

    // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, message: 'Product deleted' })
  })
