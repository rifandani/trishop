import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { IProductProps } from 'types/Product'

const CategoryItem: FC<IProductProps> = ({ product }) => {
  //#region GENERAL
  const { push } = useRouter()
  //#endregion

  //#region ACTION HANDLER
  async function toProductDetail() {
    await push(`/products/${product._id}`)
  }
  //#endregion

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex h-56 w-full items-end justify-end bg-cover"
        style={{
          backgroundImage: `url(${product.images[0].imageUrl})`,
        }}
      >
        <button
          onClick={toProductDetail}
          className="mx-5 -mb-4 transform rounded-full bg-blue-600 p-2 text-white transition duration-500 hover:scale-125 hover:bg-blue-500 focus:bg-blue-500 focus:outline-none"
        >
          <svg
            className="h-5 w-5"
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
        <h3 className="font-bold uppercase text-gray-700">{product.title}</h3>
        <span className="mt-2 text-gray-500">Rp {product.price}</span>
      </div>
    </div>
  )
}

export default CategoryItem
