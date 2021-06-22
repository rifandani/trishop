import Cors from 'cors'
import nc from 'middlewares/nc'
// files
import ProductModel from 'mongo/models/Product'
import withMongoConnect from 'middlewares/withMongoConnect'

export default nc
  // cors, middleware 1
  .use(
    Cors({
      methods: ['GET'],
    })
  )
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
