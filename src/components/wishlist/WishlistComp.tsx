import { useContext } from 'react'
import { FaHeart } from 'react-icons/fa'
// files
import WishlistProductCard from './WishlistProductCard'
import { WishlistContext } from 'contexts/WishlistContext'

export default function WishlistComp() {
  // hooks
  const { wishlist, dispatchWish } = useContext(WishlistContext) // local storage

  return (
    <main className="min-h-screen py-20 bg-white lg:pt-28 lg:mt-3">
      <div className="container flex flex-col items-center justify-center px-4 pt-2 pb-8 mx-auto sm:px-6 lg:px-8">
        {/* title */}
        <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold leading-tight tracking-widest text-orange-800 uppercase bg-orange-200 rounded-full">
          Get the best from us
        </p>

        <h1 className="flex justify-center mb-12 font-sans text-3xl font-bold leading-none tracking-tight text-center text-gray-900 b-6 sm:text-4xl md:mx-auto">
          <FaHeart className="w-8 h-8 mr-3 text-orange-800" />
          <span className="relative">Your Wishlist</span>{' '}
        </h1>

        {/* main content */}
        {wishlist && wishlist.length === 0 ? (
          <h1 className="mx-auto text-lg text-center">
            No products in wishlist
          </h1>
        ) : null}

        <div className="grid w-full grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist
            ? wishlist.map((prod) => (
                <WishlistProductCard
                  key={prod.id}
                  product={prod}
                  dispatchWish={dispatchWish}
                />
              ))
            : null}
        </div>
      </div>
    </main>
  )
}