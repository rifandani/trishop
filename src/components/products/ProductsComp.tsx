import LoadingSpinner from 'components/common/LoadingSpinner'
import ProductsPagination from 'components/common/pagination/ProductsPagination'
import ProductCard from 'components/products/ProductCard'
import { FC, useState } from 'react'
import { GiCakeSlice } from 'react-icons/gi'
import useSWR from 'swr'
import { APIResponseProducts } from 'types/Product'

const PRODUCTS_LIMIT = 6

const ProductsComp: FC = () => {
  //#region GENERAL
  const [currentPage, setCurrentPage] = useState<number>(0) // for pagination
  const offset = currentPage * PRODUCTS_LIMIT
  //#endregion

  //#region PRODUCT SERVICE
  const { data, error } = useSWR<APIResponseProducts>('/public/products', {
    refreshInterval: 10000,
  })
  //#endregion

  return (
    <main className="min-h-screen bg-white py-20 lg:mt-3 lg:pt-28">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 pt-2 pb-8 sm:px-6 lg:px-8">
        {/* title */}
        <p className="mb-4 inline-block rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold uppercase leading-tight tracking-widest text-orange-800">
          Get the best from us
        </p>

        <h1 className="b-6 mb-12 flex justify-center text-center font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <GiCakeSlice className="mt-1 mr-3 h-8 w-8 text-orange-800" />
          <span className="relative">Our Featured Products</span>{' '}
        </h1>

        {/* TODO: sorting & filtering */}

        {/* main content */}
        {error && 'Error...'}

        {!data && <LoadingSpinner />}

        <article className="mx-auto grid max-w-lg gap-10 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {data && data.count === 0
            ? 'There is no data'
            : data?.products
                .slice(offset, offset + PRODUCTS_LIMIT)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
        </article>

        {/* pagination */}
        {data && (
          <ProductsPagination
            products={data.products}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={PRODUCTS_LIMIT}
          />
        )}
      </div>
    </main>
  )
}

export default ProductsComp
