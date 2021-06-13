import { useState } from 'react'
import { GiCakeSlice } from 'react-icons/gi'
import useSWR from 'swr'
// files
import LoadingSpinner from 'components/LoadingSpinner'
import ProductCard from 'components/products/ProductCard'
import ProductsPagination from 'components/common/pagination/ProductsPagination'
import { Product } from 'contexts/CartReducer'

export interface APIResponseProducts {
  error: boolean
  products: Product[]
  count: number
}

export default function ProductsComp(): JSX.Element {
  // hooks
  const { data, error } = useSWR<APIResponseProducts>('/admin/products', {
    refreshInterval: 10000,
  })
  const [currentPage, setCurrentPage] = useState<number>(0) // for pagination
  const [limit] = useState<number>(9) // for pagination

  const offset = currentPage * limit

  // map ProductCard component
  const currentProducts =
    data &&
    data.products
      .slice(offset, offset + limit)
      .map((product) => <ProductCard key={product._id} product={product} />)

  return (
    <main className="min-h-screen py-20 bg-white lg:pt-28 lg:mt-3">
      <div className="container flex flex-col items-center justify-center px-4 pt-2 pb-8 mx-auto sm:px-6 lg:px-8">
        {/* title */}
        <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold leading-tight tracking-widest text-orange-800 uppercase bg-orange-200 rounded-full">
          Get the best from us
        </p>

        <h1 className="flex justify-center mb-12 font-sans text-3xl font-bold leading-none tracking-tight text-center text-gray-900 b-6 sm:text-4xl md:mx-auto">
          <GiCakeSlice className="w-8 h-8 mt-1 mr-3 text-orange-800" />
          <span className="relative">Our Featured Products</span>{' '}
        </h1>

        {/* TODO: sorting & filtering */}

        {/* main content */}
        {error && 'Error...'}

        {!data && <LoadingSpinner />}

        <article className="grid max-w-lg gap-10 mx-auto md:grid-cols-2 lg:grid-cols-3 md:max-w-none">
          {data && data.count === 0 ? 'There is no data' : currentProducts}
        </article>

        {/* pagination */}
        {data && (
          <ProductsPagination
            products={data?.products}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
          />
        )}
      </div>
    </main>
  )
}
