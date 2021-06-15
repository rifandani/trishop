import { GetStaticPaths, GetStaticProps } from 'next'
import { FaComments, FaPenSquare } from 'react-icons/fa'
import { NextSeo } from 'next-seo'
// files
import Nav from 'components/Nav'
import ProductDetail from 'components/products/product/ProductDetail'
import ProductReview from 'components/products/product/ProductReview'
import ReviewForm from 'components/products/product/ReviewForm'
import Footer from 'components/Footer'
import ProductModel from 'mongo/models/Product'
import ReviewModel from 'mongo/models/Review'
import dbConnect from 'mongo/config/dbConnect'
import getQueryAsString from 'utils/getQueryAsString'
import { Product as Prod } from 'contexts/CartReducer'

interface IProductDetailPageProps {
  product: Prod
}

export default function ProductDetailPage({
  product,
}: IProductDetailPageProps): JSX.Element {
  return (
    <div className="flex flex-col mt-3 space-y-12 lg:mt-5">
      <NextSeo title={product.title} description={product.desc} />

      <Nav />

      <ProductDetail product={product} />

      <h1 className="flex items-center justify-center text-2xl font-bold leading-tight tracking-tight text-center text-gray-800 md:text-3xl">
        <FaComments className="w-8 h-8 mb-2 mr-3 text-orange-800" />
        <span className="relative">Reviews</span>{' '}
      </h1>

      <ProductReview reviews={product.reviews} />

      <h1 className="flex items-center justify-center mt-6 text-2xl font-bold leading-tight tracking-tight text-center text-gray-800 md:text-3xl">
        <FaPenSquare className="w-8 h-8 mb-2 mr-3 text-orange-800" />
        <span className="relative">Submit Your Review</span>{' '}
      </h1>

      <ReviewForm productRef={product._id} />

      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // connect db
  await dbConnect()

  const _id = getQueryAsString(params._id)
  const productObj = await ProductModel.findById(_id)
    .populate({
      path: 'reviews',
      model: ReviewModel, // reference the model, or it will throw an Error
    })
    .exec()

  if (!productObj) {
    return {
      notFound: true,
    }
  }

  return {
    props: { product: JSON.parse(JSON.stringify(productObj)) },
    revalidate: 3,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // connect db
  await dbConnect()

  const products = await ProductModel.find()

  const paths = products.map((product) => ({
    params: { _id: product._id.toString() },
  }))

  return {
    paths,
    fallback: false, // means other routes should 404
  }
}
