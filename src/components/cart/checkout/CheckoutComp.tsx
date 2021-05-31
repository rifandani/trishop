import { useRouter } from 'next/router'
// files
import CheckoutProduct from './CheckoutProduct'
import useLocalStorage from 'hooks/useLocalStorage'
import { IOrder } from 'types/OrderLS'

const CheckoutComp = () => {
  // hooks
  const { push } = useRouter()
  const [order] = useLocalStorage<IOrder>('order', null)
  console.log(
    '🚀 ~ file: CheckoutComp.tsx ~ line 9 ~ CheckoutComp ~ order',
    order
  )
  // const { user_id, transaction_details, item_details } = JSON.parse(order)

  return (
    <main className="my-8 bg-white">
      <div className="container px-6 mx-auto">
        <h3 className="text-2xl font-medium text-gray-700">Checkout</h3>

        <div className="flex flex-col mt-8 lg:flex-row">
          <div className="order-2 w-full lg:w-1/2">
            {/* steps */}
            <section className="flex items-center">
              <div className="flex text-sm text-orange-500 focus:outline-none">
                <span className="flex items-center justify-center w-5 h-5 mr-2 text-white bg-orange-500 rounded-full">
                  1
                </span>{' '}
                Contacts
              </div>

              <div className="flex ml-8 text-sm text-gray-700 focus:outline-none">
                <span className="flex items-center justify-center w-5 h-5 mr-2 border-2 border-orange-500 rounded-full">
                  2
                </span>{' '}
                Shipping
              </div>

              <div className="flex ml-8 text-sm text-gray-500 focus:outline-none">
                <span className="flex items-center justify-center w-5 h-5 mr-2 border-2 border-gray-500 rounded-full">
                  3
                </span>{' '}
                Payments
              </div>
            </section>
            {/* START FORM */}
            <form className="mt-8 lg:w-3/4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Delivery method
                </h4>
                <div className="mt-6">
                  <button className="flex items-center justify-between w-full p-4 bg-white border-2 border-orange-500 rounded-md focus:outline-none">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="w-5 h-5 text-orange-600 form-radio"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        MS Delivery
                      </span>
                    </label>

                    <span className="text-sm text-gray-600">$18</span>
                  </button>
                  <button className="flex items-center justify-between w-full p-4 mt-6 bg-white border rounded-md focus:outline-none">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="w-5 h-5 text-orange-600 form-radio"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        DC Delivery
                      </span>
                    </label>

                    <span className="text-sm text-gray-600">$26</span>
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-500">
                  Delivery address
                </h4>
                <div className="flex mt-6">
                  <label className="block w-3/12">
                    <select className="block w-full mt-1 text-gray-700 form-select">
                      <option>NY</option>
                      <option>DC</option>
                      <option>MH</option>
                      <option>MD</option>
                    </select>
                  </label>
                  <label className="flex-1 block ml-3">
                    <input
                      type="text"
                      className="block w-full mt-1 text-gray-700 form-input"
                      placeholder="Address"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-500">Date</h4>
                <div className="flex mt-6">
                  <label className="flex-1 block">
                    <input
                      type="date"
                      className="block w-full mt-1 text-gray-700 form-input"
                      placeholder="Date"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <button
                  className="flex items-center text-sm font-medium text-gray-700 rounded hover:underline focus:outline-none"
                  onClick={() => push('/cart')}
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
                    <path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                  </svg>
                  <span className="mx-2">Back step</span>
                </button>
                <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-500">
                  <span>Payment</span>
                  <svg
                    className="w-5 h-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </form>
            {/* END FORM */}
          </div>

          {/* aside products */}
          <div className="flex-shrink-0 order-1 w-full mb-8 lg:w-1/2 lg:mb-0 lg:order-2">
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md px-4 py-3 border rounded-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">Order total (2)</h3>
                  {/* <span className="text-sm text-gray-600">Edit</span> */}
                </div>

                {/* product */}
                <CheckoutProduct />
                <CheckoutProduct />
                <CheckoutProduct />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CheckoutComp
