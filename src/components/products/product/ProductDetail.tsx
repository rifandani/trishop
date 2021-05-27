import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useContext } from 'react'
import { FaChevronRight, FaHeart, FaStar, FaCartPlus } from 'react-icons/fa'
// files
import { CartContext } from 'contexts/CartContext'
import { Product } from 'contexts/CartReducer'

export default function ProductDetail({ product }: { product: Product }) {
  const { title, price, stock, desc, labels, images } = product // destructure props

  // hooks
  const { push } = useRouter()
  const [imageIndex, setImageIndex] = useState<number>(0)
  const [discount] = useState<number>(0.1)
  const [quantity, setQuantity] = useState<string>('1')
  const { cart, dispatch } = useContext(CartContext)

  async function addToCart() {
    const payload = {
      ...product,
      quantity: parseInt(quantity),
    }

    // dispatch butuh waktu
    dispatch({
      type: 'ADD_PRODUCT',
      payload,
    })
  }

  async function addToWishlist() {
    console.log('cart => ', cart)
  }

  async function clickLabel(label: string) {
    await push(`/products/categories?_label=${label}`)
  }

  return (
    <main className="min-h-screen py-6">
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
          <section className="px-4 md:flex-1">
            {/* product images */}
            <div className="mb-6 bg-gray-100 rounded-lg">
              <Image
                className="rounded-lg"
                src={images[imageIndex].imageUrl}
                alt={images[imageIndex].imageName}
                height={300}
                width={650}
              />
            </div>

            {/* <div className="flex items-center w-full h-24 px-2 rounded-lg md:h-32 justify-evenly">
                </div> */}
            <div className="flex items-center px-2 -mx-2 space-x-3">
              {images.map((image: any, i: number) => (
                <div key={i}>
                  <Image
                    className="rounded-lg cursor-pointer hover:opacity-50"
                    onClick={() => setImageIndex(i)}
                    src={image.imageUrl}
                    alt={image.imageName}
                    height={100}
                    width={120}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* isi product details */}
          <section className="px-4 mt-6 md:mt-0 md:flex-1">
            {/* product title */}
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
              {title}
            </h1>

            <div className="flex items-center justify-between mb-5">
              {/* seller */}
              <p className="text-xs font-semibold tracking-wide text-gray-400">
                By{' '}
                <Link href="/">
                  <a className="hover:underline hover:text-orange-800">
                    Trishop
                  </a>
                </Link>
              </p>

              {/* reviews */}
              <div className="flex items-center my-3 space-x-1">
                {Array(5)
                  .fill('whatever')
                  .map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-orange-500" />
                  ))}

                <span className="pl-4 mt-1 text-xs font-semibold tracking-wide text-gray-400">
                  147 Reviews
                </span>
              </div>
            </div>

            {/* price & discount */}
            <div className="flex items-center space-x-4">
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
                    }).format(price - price * discount)}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xl font-semibold text-green-500">
                  Discount {discount * 100}%
                </p>
                <p className="text-sm text-gray-400">
                  Promo eksklusif hanya di bulan ramadhan.
                </p>
              </div>
            </div>

            {/* stock */}
            <section className="flex items-center my-3">
              <div className="flex items-center">
                <label className="text-xs font-semibold tracking-wide uppercase">
                  Quantity:
                </label>

                <select
                  className="pl-4 pr-4 ml-2 border border-gray-200 appearance-none cursor-pointer focus:outline-none focus:ring focus:border-orange-300 rounded-xl h-15"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {Array(stock)
                    .fill('whatever')
                    .map((_: any, i: number) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </select>

                <span
                  className={`${
                    stock > 0 ? 'text-green-500' : 'text-red-500'
                  } ml-3 text-xs font-bold tracking-wide`}
                >
                  {stock > 0 ? 'Available' : 'Not available'}
                </span>
              </div>
            </section>

            {/* desc */}
            <p className="mt-5 text-gray-400">{desc}</p>

            {/* labels */}
            <div className="flex items-center my-4 space-x-4">
              {labels.map((label: string, i: number) => (
                <button
                  className="inline-flex items-center px-3 py-1 mr-2 text-xs font-semibold tracking-wide text-blue-800 uppercase bg-blue-200 rounded-full cursor-pointer hover:opacity-50"
                  key={i}
                  onClick={() => clickLabel(label)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* cart & wishlist */}
            <div className="flex items-center mt-6 space-x-4">
              <button
                className="flex items-center h-10 px-6 py-2 font-semibold text-white bg-orange-800 rounded-full hover:opacity-50"
                onClick={addToCart}
              >
                <FaCartPlus className="w-4 h-4 mr-2" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Add to Cart
                </span>
              </button>

              <button
                className="flex items-center h-10 px-6 py-2 text-gray-400 border border-gray-200 rounded-full"
                onClick={addToWishlist}
              >
                <FaHeart className="w-4 h-4 mr-2" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Add to Wishlist
                </span>
              </button>
            </div>
          </section>
        </article>
      </section>
    </main>
  )
}
