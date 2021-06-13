import React from 'react'
import { useRouter } from 'next/router'
// files
import { PRODUCT } from '../pages/products/categories'

interface CategoryItemProps {
  product: PRODUCT
}

export default function CategoryItem({
  product,
}: CategoryItemProps): JSX.Element {
  const { push } = useRouter()

  async function toProductDetail() {
    await push(`/products/${product._id}`)
  }

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex items-end justify-end w-full h-56 bg-cover"
        style={{
          backgroundImage: `url(${product.images[0].imageUrl})`,
        }}
      >
        <button
          onClick={toProductDetail}
          className="p-2 mx-5 -mb-4 text-white transition duration-500 transform bg-blue-600 rounded-full hover:scale-125 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </button>
      </div>
      <div className="px-5 py-3">
        <h3 className="font-bold text-gray-700 uppercase">{product.title}</h3>
        <span className="mt-2 text-gray-500">Rp {product.price}</span>
      </div>
    </div>
  )
}
