import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, ChangeEvent, useMemo } from 'react'
import { FaChevronRight, FaHeart, FaStar, FaCartPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
// files
import ImageSwiper from './ImageSwiper'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { addProductToCart } from 'redux/slices/cart'
import { IProductProps } from 'types/Product'
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from 'redux/slices/wishlist'

export default function ProductDetail({ product }: IProductProps): JSX.Element {
  const { title, price, stock, desc, labels, images, sold, _id, reviews } =
    product // destructure product props

  // hooks
  const { push } = useRouter()
  const wishlist = useAppSelector((state) => state.wishlist)
  const dispatch = useAppDispatch()

  const [discount] = useState<number>(0.1)
  const [quantity, setQuantity] = useState<string>('1')
  const [error, setError] = useState<string>('')

  // prices
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

  // check if product already in wishlist
  const productWishlisted = useMemo(
    () => wishlist.values.find((prod) => prod._id === _id),
    [wishlist]
  )

  async function addToCart(): Promise<void> {
    // if quantity < 1
    if (+quantity < 1) {
      setError('Input 1 or more')
      return
    }

    const payload = {
      ...product,
      quantity: parseInt(quantity),
    }

    dispatch(addProductToCart(payload)) // dispatch cart

    toast.success('Product added to the cart')
  }

  function onChangeQuantity(e: ChangeEvent<HTMLInputElement>): void {
    const input = e.target.value

    if (Number(input) > stock) {
      setError(`Cannot exceed more than ${stock}`)
      return
    } else if (!input) {
      setError('Input 1 or more')
      return
    }

    setError('')
    setQuantity(input)
  }

  function addToWishlist(): void {
    const payload = {
      price,
      _id: _id,
      imageName: images[0].imageName,
      imageUrl: images[0].imageUrl,
      name: title,
    }

    dispatch(addProductToWishlist(payload)) // dispatch wishlist

    toast.success('Product added to wishlist')
  }

  function deleteFromWishlist(): void {
    dispatch(deleteProductFromWishlist(_id)) // dispatch wishlist

    toast.info('Product deleted from the wishlist')
  }

  const clickLabel = (label: string): Promise<boolean> =>
    push(`/products/categories?_label=${label}`)

  return (
    <main className="py-6">
      {/* Breadcrumbs */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-16">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Link href="/">
            <a className="hover:underline hover:text-orange-800">Home</a>
          </Link>

          <FaChevronRight className="w-4 h-4 leading-none text-gray-300" />

          <Link href="/products">
            <a className="hover:underline hover:text-orange-800">Products</a>
          </Link>

          <FaChevronRight className="w-4 h-4 leading-none text-gray-300" />

          <span>Product Detail</span>
        </div>
      </section>

      <section className="px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-16">
        <article className="flex flex-col -mx-4 md:flex-row">
          {/* product image swiper */}
          <ImageSwiper images={images} />

          {/* isi product details */}
          <div className="px-4 mt-6 md:mt-0 md:flex-1">
            {/* product title */}
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
              {title}
            </h1>

            <section className="flex items-center justify-between mb-5 border-b">
              {/* stock */}
              <p className="text-xs font-semibold tracking-wide text-gray-400">
                Stock <span className="text-gray-800">{stock}</span>
              </p>

              {/* sold */}
              <p className="text-xs font-semibold tracking-wide text-gray-400">
                Sold <span className="text-gray-800">{sold}</span>
              </p>

              {/* reviews */}
              <div className="flex items-center my-3 space-x-1">
                <FaStar className="w-4 h-4 text-orange-500" />

                <span className="pl-2 mt-1 text-xs font-semibold tracking-wide text-gray-800">
                  {averageStars}
                </span>

                <span className="pl-2 mt-1 text-xs font-semibold tracking-wide text-gray-400">
                  ({reviewsCount} reviews)
                </span>
              </div>
            </section>

            {/* price & discount */}
            <section className="flex items-center space-x-4">
              <div>
                <div className="flex px-3 py-2 bg-gray-100 rounded-lg">
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
            <section className="flex items-center my-4">
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
            <section className="flex-col items-center mb-2">
              {/* quantity */}
              <div className="flex items-center">
                <label className="text-xs font-semibold tracking-wide uppercase">
                  Order
                </label>

                <input
                  className="w-1/6 h-10 ml-8 cursor-pointer"
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
              <div className="flex items-center mt-5">
                <p className="text-xs font-semibold tracking-wide uppercase">
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
            <section className="flex items-center mt-6 space-x-4">
              <button
                className="flex items-center h-10 px-6 py-2 font-semibold text-white bg-orange-800 rounded-full hover:bg-orange-500"
                onClick={addToCart}
              >
                <FaCartPlus className="w-4 h-4 mr-2" />
                <span className="mt-1 text-xs font-semibold tracking-wide uppercase">
                  Add to Cart
                </span>
              </button>

              <button
                className="flex items-center h-10 px-6 py-2 text-gray-400 border border-gray-200 rounded-full hover:border-orange-800 hover:bg-orange-200 group"
                onClick={productWishlisted ? deleteFromWishlist : addToWishlist}
              >
                <FaHeart className="w-4 h-4 mr-2 group-hover:text-orange-800" />
                <span className="text-xs font-semibold tracking-wide uppercase group-hover:text-orange-800">
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
