import Footer from 'components/common/Footer'
import LoadingSpinner from 'components/common/LoadingSpinner'
import Nav from 'components/common/Nav'
import ProductDetail from 'components/products/product/ProductDetail'
import ProductReview from 'components/products/product/ProductReview'
import ReviewForm from 'components/products/product/ReviewForm'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FaComments, FaPenSquare } from 'react-icons/fa'
import useSWR from 'swr'
import { APIResponseProduct } from 'types/Product'

const ProductDetailPage: NextPage = () => {
  //#region GENERAL
  const { query } = useRouter()
  const { data, error } = useSWR<APIResponseProduct>(
    query._id ? `/public/products/${query._id}` : null
  )
  //#endregion

  return (
    <div className="mt-3 flex flex-col space-y-12 lg:mt-5">
      <Nav />

      {error && 'Error...'}
      {!data && <LoadingSpinner className="mx-auto py-40" />}
      {data && (
        <>
          <NextSeo title={data.product.title} description={data.product.desc} />

          <ProductDetail product={data.product} />

          <h1 className="flex items-center justify-center text-center text-2xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
            <FaComments className="mb-2 mr-3 h-8 w-8 text-orange-800" />
            <span className="relative">Reviews</span>{' '}
          </h1>

          <ProductReview
            reviews={data.product.reviews}
            productRef={data.product._id}
          />

          <h1 className="mt-6 flex items-center justify-center text-center text-2xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
            <FaPenSquare className="mb-2 mr-3 h-8 w-8 text-orange-800" />
            <span className="relative">Submit Your Review</span>{' '}
          </h1>

          <ReviewForm productRef={data.product._id} />
        </>
      )}

      <Footer />
    </div>
  )
}

export default ProductDetailPage
