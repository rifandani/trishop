import { GetStaticPaths, GetStaticProps } from 'next'
// files
import Navbar from 'components/admin/Navbar'
import EditProduct from 'components/admin/EditProduct'
import Product from 'mongo/models/Product'
import MongoConfig from 'mongo/config/MongoConfig'
import { Product as Prod } from 'contexts/CartReducer'

export default function ProductEdit({ product }: { product: Prod }) {
  return (
    <Navbar>
      <EditProduct product={product} />
    </Navbar>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // connect db
  const conn = await MongoConfig.connectDB()

  const id = params?.id
  const productObj = await Product.findById(id)

  if (!productObj) {
    return {
      notFound: true,
    }
  }

  const product = {
    _id: productObj._id.toString(),
    labels: productObj.labels,
    images: productObj.images,
    title: productObj.title,
    price: productObj.price,
    stock: productObj.stock,
    desc: productObj.desc,
    createdAt: productObj.createdAt.toString(),
    updatedAt: productObj.updatedAt.toString(),
    __v: productObj.__v,
  }

  await conn.disconnect()

  return { props: { product } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  await MongoConfig.connectDB()

  const products = await Product.find()

  const paths = products.map((product) => ({
    params: { id: product._id.toString() },
  }))

  return {
    paths,
    fallback: false, // means other routes should 404.
  }
}
