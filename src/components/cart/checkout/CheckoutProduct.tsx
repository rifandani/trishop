import Image from 'next/image'
import { FC } from 'react'
import { IOrderItemDetails } from 'types/LocalStorage'
import generateRupiah from 'utils/generateRupiah'

interface Props {
  product: IOrderItemDetails
}

const CheckoutProduct: FC<Props> = ({ product }) => {
  return (
    <main className="mt-6 flex justify-between">
      <div className="flex">
        {/* image */}
        <span className="relative h-20 w-20 flex-shrink-0">
          <Image
            src={product.imageUrl}
            alt={product.imageName}
            className="rounded"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </span>

        <div className="mx-3">
          {/* title */}
          <h3 className="text-sm text-gray-600">{product.name}</h3>

          <div className="mt-2 flex items-center">
            {/* <button className="text-gray-500 focus:outline-none focus:text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button> */}

            {/* quantity */}
            <span className="text-gray-700">x {product.quantity}</span>

            {/* <button className="text-gray-500 focus:outline-none focus:text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button> */}
          </div>
        </div>
      </div>

      {/* price */}
      <span className="text-orange-800">{generateRupiah(product.price)}</span>
    </main>
  )
}

export default CheckoutProduct
