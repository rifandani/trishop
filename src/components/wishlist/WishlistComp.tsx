import { FC } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useAppSelector } from 'redux/store'
import WishlistProductCard from './WishlistProductCard'

const WishlistComp: FC = () => {
  //#region GENERAL
  const wishlist = useAppSelector((state) => state.wishlist)
  //#endregion

  return (
    <main className="min-h-screen bg-white py-20 lg:mt-3 lg:pt-28">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 pt-2 pb-8 sm:px-6 lg:px-8">
        {/* title */}
        <p className="mb-4 inline-block rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold uppercase leading-tight tracking-widest text-orange-800">
          Make your wish
        </p>

        <h1 className="b-6 mb-12 flex justify-center text-center font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <FaHeart className="mr-3 h-8 w-8 text-orange-800" />
          <span className="relative">Your Wishlist</span>{' '}
        </h1>

        {/* main content */}
        {wishlist.count === 0 ? (
          <h1 className="mx-auto text-center text-lg">
            No products in wishlist
          </h1>
        ) : null}

        <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.count > 0
            ? wishlist.values.map((product) => (
                <WishlistProductCard key={product._id} product={product} />
              ))
            : null}
        </div>
      </div>
    </main>
  )
}

export default WishlistComp
