import { useRouter } from 'next/router'
// files

const CheckoutPage = () => {
  // hooks
  const { push } = useRouter()

  return (
    <main className="my-8 bg-white">
      <div className="container px-6 mx-auto">
        <h3 className="text-2xl font-medium text-gray-700">Checkout</h3>
        <div className="flex flex-col mt-8 lg:flex-row">
          <div className="order-2 w-full lg:w-1/2">
            <div className="flex items-center">
              <button className="flex text-sm text-blue-500 focus:outline-none">
                <span className="flex items-center justify-center w-5 h-5 mr-2 text-white bg-blue-500 rounded-full">
                  1
                </span>{' '}
                Contacts
              </button>
              <button className="flex ml-8 text-sm text-gray-700 focus:outline-none">
                <span className="flex items-center justify-center w-5 h-5 mr-2 border-2 border-blue-500 rounded-full">
                  2
                </span>{' '}
                Shipping
              </button>
              <button
                className="flex ml-8 text-sm text-gray-500 focus:outline-none"
                disabled
              >
                <span className="flex items-center justify-center w-5 h-5 mr-2 border-2 border-gray-500 rounded-full">
                  3
                </span>{' '}
                Payments
              </button>
            </div>
            <form className="mt-8 lg:w-3/4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Delivery method
                </h4>
                <div className="mt-6">
                  <button className="flex items-center justify-between w-full p-4 bg-white border-2 border-blue-500 rounded-md focus:outline-none">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="w-5 h-5 text-blue-600 form-radio"
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
                        className="w-5 h-5 text-blue-600 form-radio"
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
                <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
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
          </div>

          <div className="flex-shrink-0 order-1 w-full mb-8 lg:w-1/2 lg:mb-0 lg:order-2">
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md px-4 py-3 border rounded-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">Order total (2)</h3>
                  <span className="text-sm text-gray-600">Edit</span>
                </div>
                <div className="flex justify-between mt-6">
                  <div className="flex">
                    <img
                      className="object-cover w-20 h-20 rounded"
                      src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
                      alt=""
                    />
                    <div className="mx-3">
                      <h3 className="text-sm text-gray-600">Mac Book Pro</h3>
                      <div className="flex items-center mt-2">
                        <button className="text-gray-500 focus:outline-none focus:text-gray-600">
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
                        </button>
                        <span className="mx-2 text-gray-700">2</span>
                        <button className="text-gray-500 focus:outline-none focus:text-gray-600">
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
                        </button>
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-600">20$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CheckoutPage
