import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useContext } from 'react'
import { FaChevronRight, FaHeart, FaStar, FaCartPlus } from 'react-icons/fa'
// files
import { CartContext } from 'contexts/CartContext'
import { Product } from 'contexts/CartReducer'

export default function ProductDetail({ product }: { product: Product }) {
  const [images] = useState(product.images || [])
  const [imageIndex, setImageIndex] = useState<number>(0)
  const [quantity, setQuantity] = useState<string>('1')

  const { cart, dispatch } = useContext(CartContext)

  const { push } = useRouter()

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
    <article className="py-6">
      {/* Breadcrumbs */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-16">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Link href="/">
            <a className="hover:underline hover:text-orange-800">Home</a>
          </Link>

          <FaChevronRight className="w-5 h-5 leading-none text-gray-300" />

          <Link href="/products">
            <a className="hover:underline hover:text-orange-800">Products</a>
          </Link>

          <FaChevronRight className="w-5 h-5 leading-none text-gray-300" />

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
            <h2 className="mb-1 text-2xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
              {product.title}
            </h2>

            {/* seller */}
            <p className="text-sm text-gray-500">
              By{' '}
              <a href="/" className="text-orange-800 hover:underline">
                TriShop
              </a>
            </p>

            {/* reviews */}
            <div className="flex items-center my-3 space-x-1">
              <FaStar className="text-orange-500 h-14" />
              <FaStar className="text-orange-500 h-14" />
              <FaStar className="text-orange-500 h-14" />
              <FaStar className="text-orange-500 h-14" />
              <FaStar className="text-orange-500 h-14" />
              <span className="pl-4 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                147 reviews
              </span>
            </div>

            {/* price & discount */}
            <div className="flex items-center space-x-4">
              <div>
                <div className="flex px-3 py-2 bg-gray-100 rounded-lg">
                  <span className="mt-1 mr-2 text-orange-400">Rp</span>
                  <span className="mr-2 text-3xl font-bold text-orange-800 line-through">
                    {(product.price * 110) / 100}
                  </span>
                  <span className="text-3xl font-bold text-orange-800">
                    {product.price}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xl font-semibold text-green-500">
                  Discount 10%
                </p>
                <p className="text-sm text-gray-400">
                  Promo eksklusif hanya di bulan ramadhan.
                </p>
              </div>
            </div>

            {/* stock */}
            <div className="flex items-center my-3">
              <label className="flex items-center mr-3">
                <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase ">
                  Quantity:
                </span>
                <select
                  className="pl-4 pr-4 ml-2 border border-gray-200 appearance-none cursor-pointer focus:outline-none focus:ring focus:border-orange-300 rounded-xl h-15"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {Array(product.stock)
                    .fill('whatever')
                    .map((_: any, i: number) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </select>
              </label>

              <span className="text-xs font-bold tracking-wide text-green-500">
                ~ Ready
              </span>
            </div>

            {/* desc */}
            <p className="text-gray-500">{product.desc}</p>

            {/* labels */}
            <div className="flex items-center py-4 space-x-4">
              {product.labels.map((label: string, i: number) => (
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
            <div className="flex items-center pt-6 space-x-4">
              <button
                className="flex items-center h-10 px-6 py-2 font-semibold text-white bg-orange-800 rounded-full hover:opacity-50"
                onClick={addToCart}
              >
                <FaCartPlus className="mr-2" /> Add to Cart
              </button>

              <button
                className="flex items-center h-10 p-3 border border-gray-200 rounded-full cursor-pointer"
                onClick={addToWishlist}
              >
                <FaHeart className="mr-2 text-gray-400 h-14" />
                <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase focus:outline-none focus:ring">
                  Add to Wishlist
                </span>
              </button>
            </div>
          </section>
        </article>
      </section>
    </article>
  )
}
