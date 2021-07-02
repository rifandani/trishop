import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withCheckAuthCookieAsAdmin from 'middlewares/withCheckAuthCookieAsAdmin'
import withYupConnect from 'middlewares/withYupConnect'
import withMongoConnect from 'middlewares/withMongoConnect'
import ProductModel from 'mongo/models/Product'
import { productApiSchema, TProductApiSchema } from 'yup/apiSchema'

export default nc
  .use(withCors(['GET', 'POST'])) // cors
  .use(withCheckAuthCookieAsAdmin()) // check auth cookie
  .use(withYupConnect(productApiSchema)) // yup
  .use(withMongoConnect()) // connect mongodb
  .get('/api/v1/admin/products', async (req, res) => {
    // there is no query for filtering & sorting
    if (Object.keys(req.query).length === 0) {
      // find all products
      const products = await ProductModel.find()

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, products, count: products.length })
      return
    }

    // const customQuery = req.query
  })
  .post('/api/v1/admin/products', async (req, res) => {
    // destructure req.body
    const { title, price, stock, desc, labels, images } =
      req.body as TProductApiSchema

    // create new product to mongodb
    const product = await ProductModel.create({
      title,
      price,
      stock,
      desc,
      labels,
      images,
    })

    // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({ error: false, productId: product._id })
  })
