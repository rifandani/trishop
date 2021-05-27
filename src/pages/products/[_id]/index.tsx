import { GetStaticPaths, GetStaticProps } from 'next'
// files
import Nav from 'components/Nav'
import ProductDetail from 'components/ProductDetail'
import ProductModel from 'mongo/models/Product'
import MongoConfig from 'mongo/config/MongoConfig'
import { Product as Prod } from 'contexts/CartReducer'

export default function ProductDetailPage({ product }: { product: Prod }) {
  return (
    <div className="flex flex-col mt-3 space-y-12 lg:mt-5">
      <Nav />

      <ProductDetail product={product} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // connect db
  const conn = await MongoConfig.connectDB()

  const _id = params?._id
  const productObj = await ProductModel.findById(_id)

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

  return {
    props: { product },
    revalidate: 3,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // connect db
  const conn = await MongoConfig.connectDB()

  const products = await ProductModel.find()

  const paths = products.map((product) => ({
    params: { _id: product._id.toString() },
  }))

  await conn.disconnect()

  return {
    paths,
    fallback: false, // means other routes should 404
  }
}
