import Cors from 'cors'
// files
import nc from 'middlewares/nc'
import withMongoConnect from 'middlewares/withMongoConnect'
import ProductModel from 'mongo/models/Product'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['GET'],
    })
  )
  .use(withMongoConnect()) // connect mongodb middleware
  .get(async (_req, res) => {
    // get all products
      const products = await ProductModel.find()

      const x = [] as string[]

      const labels = products.map((product) => product.labels)
      labels.forEach((label: string[]) => {
        label.forEach((el: string) => x.push(el))
      })

      const categories = [...new Set(x)] // filter duplicate value in array

      // JSON response => [category] ---------------------------------------- OK
      return res.status(200).json(categories)
  })
