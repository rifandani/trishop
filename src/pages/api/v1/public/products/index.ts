import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import ProductModel from 'mongo/models/Product'
import withMongoConnect from 'middlewares/withMongoConnect'

export default nc
  .use(withCors(['GET'])) // cors
  .use(withMongoConnect()) // connet mongodb, middleware 2
  .get(async (req, res) => {
    /* --------------------------------- GET req => /public/products -------------------------------- */
    if (Object.keys(req.query).length === 0) {
      const products = await ProductModel.find()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, products, count: products.length })
      return
    }

    /* --------------------------------- GET req => /public/products?label= -------------------------------- */
    // const customQuery = req.query
  })
