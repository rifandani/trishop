import Link from 'next/link'
import { FC } from 'react'
import { FaHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import {
  deleteProductFromWishlist,
  WishlistPayload,
} from 'redux/slices/wishlist'
import { useAppDispatch } from 'redux/store'
import generateRupiah from 'utils/generateRupiah'

interface Props {
  product: WishlistPayload
}

const WishlistProductCard: FC<Props> = ({ product }) => {
  //#region GENERAL
  const { _id, imageUrl, name, price } = product

  const dispatch = useAppDispatch()
  //#endregion

  //#region ACTION HANDLER
  function onDeleteWishlist() {
    dispatch(deleteProductFromWishlist(_id)) // dispatch wishlist

    // on success
    toast.info('Product deleted from the wishlist')
  }
  //#endregion

  return (
    <a className="card-shadow mx-auto w-full max-w-sm overflow-hidden shadow-md">
      <div
        className="flex h-56 w-full items-end justify-end bg-cover"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <button
          onClick={onDeleteWishlist}
          className="mx-5 -mb-4 rounded-full bg-orange-800 p-2 text-white hover:bg-orange-500 focus:bg-orange-500 focus:outline-none"
        >
          <FaHeart className="h-5 w-5" />
        </button>
      </div>

      <div className="px-5 py-3">
        <Link href={`/products/${_id}`}>
          <h3 className="cursor-pointer text-gray-700 hover:text-orange-800 hover:underline">
            {name}
          </h3>
        </Link>

        <span className="mt-2 text-gray-500">{generateRupiah(price)}</span>
      </div>
    </a>
  )
}

export default WishlistProductCard
