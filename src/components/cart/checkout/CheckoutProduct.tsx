import { IOrderItemDetails } from 'types/OrderLS'
import generateRupiah from 'utils/generateRupiah'

export default function CheckoutProduct({
  product,
}: {
  product: IOrderItemDetails
}) {
  return (
    <main className="flex justify-between mt-6">
      <div className="flex">
        {/* image */}
        <img
          className="object-cover w-20 h-20 rounded"
          src={product.imageUrl}
          alt={product.imageName}
        />

        <div className="mx-3">
          {/* title */}
          <h3 className="text-sm text-gray-600">{product.name}</h3>

          <div className="flex items-center mt-2">
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
