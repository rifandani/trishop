import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useState } from 'react'
import { FaCartPlus, FaChevronRight, FaHeart, FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { addProductToCart } from 'redux/slices/cart'
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from 'redux/slices/wishlist'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { IProductProps } from 'types/Product'
import SwiperZoomGallery from './SwiperZoomGallery'

const ProductDetail: FC<IProductProps> = ({ product }) => {
  //#region GENERAL
  const { title, price, stock, desc, labels, images, sold, _id, reviews } =
    product

  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string>('')

  // wishlist
  const wishlist = useAppSelector((state) => state.wishlist)
  const productWishlisted = wishlist.values.find((prod) => prod._id === _id)

  // prices
  const [discount] = useState<number>(0.1)
  const [quantity, setQuantity] = useState<string>('1')
  const priceAfterDiscount = price - price * discount
  const subtotal = Number(quantity) * priceAfterDiscount

  // reviews
  const reviewsCount = reviews.length
  const averageStars =
    reviewsCount > 0
      ? (
          reviews
            .map((review) => review.star)
            .reduce((acc, curr) => acc + curr) / reviewsCount
        ).toPrecision(2)
      : 0
  //#endregion

  //#region ACTION HANDLER
  const addToCart = async (): Promise<void> => {
    // validation
    if (+quantity < 1) {
      setError('Input 1 or more')
      return
    }

    // dispatch cart action
    dispatch(
      addProductToCart({
        ...product,
        quantity: parseInt(quantity),
      })
    )

    // on success
    toast.success('Product added to the cart')
  }

  const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value

    // validation
    if (Number(input) > stock) {
      setError(`Cannot exceed more than ${stock}`)
      return
    } else if (!input) {
      setError('Input 1 or more')
      return
    }

    // on success
    setError('')
    setQuantity(input)
  }

  const addToWishlist = (): void => {
    // dispatch action
    dispatch(
      addProductToWishlist({
        price,
        _id: _id,
        imageName: images[0].imageName,
        imageUrl: images[0].imageUrl,
        name: title,
      })
    )

    // on success
    toast.success('Product added to wishlist')
  }

  const deleteFromWishlist = (): void => {
    // dispatch action
    dispatch(deleteProductFromWishlist(_id))

    // on success
    toast.info('Product deleted from the wishlist')
  }

  const clickLabel = (label: string): Promise<boolean> =>
    push(`/products/categories?_label=${label}`)
  //#endregion

  return (
    <main className="py-6">
      {/* Breadcrumbs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Link href="/">
            <a className="hover:text-orange-800 hover:underline">Home</a>
          </Link>

          <FaChevronRight className="h-4 w-4 leading-none text-gray-300" />

          <Link href="/products">
            <a className="hover:text-orange-800 hover:underline">Products</a>
          </Link>

          <FaChevronRight className="h-4 w-4 leading-none text-gray-300" />

          <span>Product Detail</span>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-16">
        <article className="-mx-4 flex flex-col">
          {/* product image swiper */}
          <SwiperZoomGallery images={images} />

          {/* isi product details */}
          <div className="mt-6 px-4 md:mt-0 md:flex-1">
            {/* product title */}
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
              {title}
            </h1>

            <section className="mb-5 flex items-center justify-between border-b">
              {/* stock */}
              <p className="text-xs font-semibold tracking-wide text-gray-400">
                Stock <span className="text-gray-800">{stock}</span>
              </p>

              {/* sold */}
              <p className="text-xs font-semibold tracking-wide text-gray-400">
                Sold <span className="text-gray-800">{sold}</span>
              </p>

              {/* reviews */}
              <div className="my-3 flex items-center space-x-1">
                <FaStar className="h-4 w-4 text-orange-500" />

                <span className="mt-1 pl-2 text-xs font-semibold tracking-wide text-gray-800">
                  {averageStars}
                </span>

                <span className="mt-1 pl-2 text-xs font-semibold tracking-wide text-gray-400">
                  ({reviewsCount} reviews)
                </span>
              </div>
            </section>

            {/* price & discount */}
            <section className="flex items-center space-x-4">
              <div>
                <div className="flex rounded-lg bg-gray-100 px-3 py-2">
                  <span className="mt-1 mr-2 text-orange-800">Rp</span>

                  <span className="mr-2 text-3xl font-bold text-orange-800 line-through">
                    {new Intl.NumberFormat('id-ID', {
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(price)}
                  </span>

                  <span className="text-3xl font-bold text-orange-800">
                    {new Intl.NumberFormat('id-ID', {
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(priceAfterDiscount)}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xl font-semibold text-blue-500">
                  Discount {discount * 100}%
                </p>
                <p className="text-sm text-gray-400">
                  Promo eksklusif hanya di bulan ramadhan.
                </p>
              </div>
            </section>

            {/* desc */}
            <p className="mt-5 text-gray-400">{desc}</p>

            {/* labels */}
            <section className="my-4 flex flex-wrap items-center gap-3">
              {labels.map((label: string, i: number) => (
                <button
                  className="product-label-btn"
                  key={i}
                  onClick={() => clickLabel(label)}
                >
                  {label}
                </button>
              ))}
            </section>

            <hr className="my-5" />

            {/* quantity + subtotal */}
            <section className="mb-2 flex-col items-center">
              {/* quantity */}
              <div className="flex items-center">
                <label className="text-xs font-semibold uppercase tracking-wide">
                  Order
                </label>

                <input
                  className="ml-8 h-10 w-1/6 cursor-pointer"
                  type="number"
                  value={quantity}
                  onChange={onChangeQuantity}
                  max={stock}
                  min={stock === 0 ? 0 : 1}
                />

                {error && (
                  <span className="ml-3 text-xs font-bold tracking-wide text-red-500">
                    {error}
                  </span>
                )}
              </div>

              {/* subtotal */}
              <div className="mt-5 flex items-center">
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Subtotal
                </p>

                <p className="ml-3 mr-2 text-orange-800">Rp</p>

                <span className="text-3xl font-bold text-orange-800">
                  {new Intl.NumberFormat('id-ID', {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }).format(subtotal)}
                </span>
              </div>
            </section>

            {/* cart & wishlist */}
            <section className="mt-6 flex items-center space-x-4">
              <button
                className="flex h-10 items-center rounded-full bg-orange-800 px-6 py-2 font-semibold text-white hover:bg-orange-500"
                onClick={addToCart}
              >
                <FaCartPlus className="mr-2 h-4 w-4" />
                <span className="mt-1 text-xs font-semibold uppercase tracking-wide">
                  Add to Cart
                </span>
              </button>

              <button
                className="group flex h-10 items-center rounded-full border border-gray-200 px-6 py-2 text-gray-400 hover:border-orange-800 hover:bg-orange-200"
                onClick={productWishlisted ? deleteFromWishlist : addToWishlist}
              >
                <FaHeart className="mr-2 h-4 w-4 group-hover:text-orange-800" />
                <span className="text-xs font-semibold uppercase tracking-wide group-hover:text-orange-800">
                  {productWishlisted
                    ? 'Delete from wishlist'
                    : 'Add to wishlist'}
                </span>
              </button>
            </section>
          </div>
        </article>
      </section>
    </main>
  )
}

export default ProductDetail
