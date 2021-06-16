import useSWR from 'swr'
import { FaComments, FaPenSquare } from 'react-icons/fa'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
// files
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import ProductDetail from 'components/products/product/ProductDetail'
import ProductReview from 'components/products/product/ProductReview'
import ReviewForm from 'components/products/product/ReviewForm'
import LoadingSpinner from 'components/LoadingSpinner'
import { APIResponseProduct } from 'types/Product'

export default function ProductDetailPage(): JSX.Element {
  // hooks
  const { query } = useRouter()
  const { data, error } = useSWR<APIResponseProduct>(
    query._id ? `/public/products/${query._id}` : null
  )

  return (
    <div className="flex flex-col mt-3 space-y-12 lg:mt-5">
      <Nav />

      {error && 'Error...'}
      {!data && <LoadingSpinner className="py-40 mx-auto" />}
      {data && (
        <>
          <NextSeo title={data.product.title} description={data.product.desc} />

          <ProductDetail product={data.product} />

          <h1 className="flex items-center justify-center text-2xl font-bold leading-tight tracking-tight text-center text-gray-800 md:text-3xl">
            <FaComments className="w-8 h-8 mb-2 mr-3 text-orange-800" />
            <span className="relative">Reviews</span>{' '}
          </h1>

          <ProductReview
            reviews={data.product.reviews}
            productRef={data.product._id}
          />

          <h1 className="flex items-center justify-center mt-6 text-2xl font-bold leading-tight tracking-tight text-center text-gray-800 md:text-3xl">
            <FaPenSquare className="w-8 h-8 mb-2 mr-3 text-orange-800" />
            <span className="relative">Submit Your Review</span>{' '}
          </h1>

          <ReviewForm productRef={data.product._id} />
        </>
      )}

      <Footer />
    </div>
  )
}

// TODO: use SWR instead getStaticProps for better UX
