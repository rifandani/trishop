import Link from 'next/link'
import { Dispatch } from 'react'
import { FaHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
// files
import generateRupiah from 'utils/generateRupiah'
import { WishlistPayload, Action } from 'contexts/WishlistReducer'

interface Props {
  product: WishlistPayload
  dispatchWish: Dispatch<Action>
}

export default function WishlistProductCard({ product, dispatchWish }: Props) {
  const { id, imageUrl, name, price } = product

  function onDeleteWishlist() {
    dispatchWish({
      type: 'DEL_WISHLIST',
      payload: product,
    })

    toast.info('Product deleted from the wishlist')
  }

  return (
    <a className="w-full max-w-sm mx-auto overflow-hidden shadow-md card-shadow">
      <div
        className="flex items-end justify-end w-full h-56 bg-cover"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <button
          onClick={onDeleteWishlist}
          className="p-2 mx-5 -mb-4 text-white bg-orange-800 rounded-full hover:bg-orange-500 focus:outline-none focus:bg-orange-500"
        >
          <FaHeart className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 py-3">
        <Link href={`/products/${id}`}>
          <h3 className="text-gray-700 cursor-pointer hover:text-orange-800 hover:underline">
            {name}
          </h3>
        </Link>

        <span className="mt-2 text-gray-500">{generateRupiah(price)}</span>
      </div>
    </a>
  )
}
