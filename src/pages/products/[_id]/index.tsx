import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { FaComments } from 'react-icons/fa'
// files
import Nav from 'components/Nav'
import ProductDetail from 'components/products/product/ProductDetail'
import ProductReview from 'components/products/product/ProductReview'
import Footer from 'components/Footer'
import ProductModel from 'mongo/models/Product'
import MongoConfig from 'mongo/config/MongoConfig'
import { Product as Prod } from 'contexts/CartReducer'

interface IProductDetailPageProps {
  product: Prod
}

export default function ProductDetailPage({
  product,
}: IProductDetailPageProps) {
  return (
    <div className="flex flex-col mt-3 space-y-12 lg:mt-5">
      <Head>
        <title>Trishop - {product.title}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Nav />

      <ProductDetail product={product} />

      <h1 className="flex items-center justify-center text-2xl font-bold leading-tight tracking-tight text-center text-gray-800 md:text-3xl">
        <FaComments className="w-8 h-8 mb-2 mr-3 text-orange-800" />
        <span className="relative">Reviews</span>{' '}
      </h1>

      <ProductReview />

      <Footer />
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

  // disconnect db
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

  // disconnect db
  await conn.disconnect()

  return {
    paths,
    fallback: false, // means other routes should 404
  }
}
