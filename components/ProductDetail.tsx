import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { useState } from 'react';
import { FaChevronRight, FaHeart, FaStar, FaCartPlus } from 'react-icons/fa';
// files
import { CartContext } from '../contexts/CartContext';

export default function ProductDetail({ product }: any) {
  const [images] = useState(product.images || []);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<string>('1');

  const { cart, dispatch } = useContext(CartContext);

  async function addToCart() {
    const payload = {
      ...product,
      quantity: parseInt(quantity),
    };

    // dispatch butuh waktu
    dispatch({
      type: 'ADD_PRODUCT',
      payload,
    });
  }

  async function addToWishlist() {
    console.log('cart => ', cart);
  }

  return (
    <article className="py-6">
      {/* Breadcrumbs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <Link href="/">
            <a className="hover:underline hover:text-orange-800">Home</a>
          </Link>

          <FaChevronRight className="h-5 w-5 leading-none text-gray-300" />

          <Link href="/products">
            <a className="hover:underline hover:text-orange-800">Products</a>
          </Link>

          <FaChevronRight className="h-5 w-5 leading-none text-gray-300" />

          <span>Product Detail</span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 mt-6">
        <article className="flex flex-col md:flex-row -mx-4">
          <section className="md:flex-1 px-4">
            {/* product images */}
            <div className="rounded-lg bg-gray-100 mb-6">
              {product && (
                <Image
                  className="rounded-lg"
                  src={images[imageIndex].imageUrl}
                  alt={images[imageIndex].imageName}
                  height={300}
                  width={650}
                />
              )}
            </div>

            {/* <div className="px-2 w-full rounded-lg h-24 md:h-32 flex items-center justify-evenly">
                </div> */}
            <div className="flex items-center space-x-3 -mx-2 px-2">
              {product &&
                images.map((image: any, i: number) => (
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
          <section className="mt-6 md:mt-0 md:flex-1 px-4">
            {/* product title */}
            <h2 className="mb-1 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
              {product.title}
            </h2>

            {/* seller */}
            <p className="text-gray-500 text-sm">
              By{' '}
              <a href="/" className="text-orange-800 hover:underline">
                TriShop
              </a>
            </p>

            {/* reviews */}
            <div className="my-3 flex items-center space-x-1">
              <FaStar className="h-14 text-yellow-500" />
              <FaStar className="h-14 text-yellow-500" />
              <FaStar className="h-14 text-yellow-500" />
              <FaStar className="h-14 text-yellow-500" />
              <FaStar className="h-14 text-yellow-500" />
              <span className="pl-4 text-xs uppercase text-gray-400 tracking-wide font-semibold">
                147 reviews
              </span>
            </div>

            {/* price & discount */}
            <div className="flex items-center space-x-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-orange-400 mr-2 mt-1">Rp</span>
                  <span className="font-bold text-orange-800 text-3xl line-through mr-2">
                    {(product.price * 110) / 100}
                  </span>
                  <span className="font-bold text-orange-800 text-3xl">
                    {product.price}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-green-500 text-xl font-semibold">
                  Discount 10%
                </p>
                <p className="text-gray-400 text-sm">
                  Promo eksklusif hanya di bulan ramadhan.
                </p>
              </div>
            </div>

            {/* stock */}
            <div className="flex items-center my-3">
              <label className="flex items-center mr-3">
                <span className=" text-xs uppercase text-gray-400 tracking-wide font-semibold">
                  Quantity:
                </span>
                <select
                  className="focus:outline-none focus:ring focus:border-orange-300 cursor-pointer appearance-none rounded-xl border border-gray-200 ml-2 pl-4 pr-4 h-15"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {product &&
                    Array(product.stock)
                      .fill('whatever')
                      .map((_: any, i: number) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                </select>
              </label>

              <span className="text-xs text-green-500 tracking-wide font-bold">
                ~ Ready
              </span>
            </div>

            {/* desc */}
            <p className="text-gray-500">{product.desc}</p>

            {/* labels */}
            <div className="flex items-center py-4 space-x-4">
              {product &&
                product.labels.map((label: string, i: number) => (
                  <span
                    key={i}
                    className="cursor-pointer inline-flex items-center px-3 py-1 mr-2 text-blue-800 bg-blue-200 rounded-full hover:opacity-50 text-xs uppercase tracking-wide font-semibold"
                  >
                    {label}
                  </span>
                ))}
            </div>

            {/* cart & wishlist */}
            <div className="flex items-center pt-6 space-x-4">
              <button
                onClick={addToCart}
                className="flex items-center h-10 px-6 py-2 font-semibold rounded-full bg-orange-800 hover:opacity-50 text-white"
              >
                <FaCartPlus className="mr-2" /> Add to Cart
              </button>

              <div
                onClick={addToWishlist}
                className="flex items-center cursor-pointer h-10 p-3 rounded-full border-gray-200 border"
              >
                <FaHeart className="h-14 text-gray-400 mr-2" />
                <span className="focus:outline-none focus:ring text-xs uppercase text-gray-400 tracking-wide font-semibold">
                  Add to Wishlist
                </span>
              </div>
            </div>
          </section>
        </article>
      </section>
    </article>
  );
}
