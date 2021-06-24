import { toast } from 'react-toastify'
import { MdReportProblem } from 'react-icons/md'
import {
  FaUserFriends,
  FaShoppingCart,
  FaShoppingBag,
  FaMoneyBillWave,
  FaTicketAlt,
} from 'react-icons/fa'
// files

export default function AdminDashboard(): JSX.Element {
  // hooks

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="container px-6 py-8 mx-auto">
        {/* dashboard title */}
        <h3
          className="text-3xl font-medium text-gray-700"
          data-cy="user-dashboard"
        >
          User Dashboard
        </h3>

        <div className="mt-4">
          <div className="flex flex-wrap -mx-6">
            {/* Total Users */}
            <section className="w-full px-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-indigo-500 bg-opacity-75 rounded-full">
                  <FaUserFriends className="w-8 h-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">{11}</h4>
                  <div className="text-gray-500">Total Users</div>
                </div>
              </div>
            </section>

            {/* Total Products */}
            <section className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-pink-500 bg-opacity-75 rounded-full">
                  <FaShoppingBag className="w-8 h-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">{22}</h4>
                  <div className="text-gray-500">Total Products</div>
                </div>
              </div>
            </section>

            {/* Total Coupons */}
            <section className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-blue-500 bg-opacity-75 rounded-full">
                  <FaTicketAlt className="w-8 h-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">{33}</h4>
                  <div className="text-gray-500">Total Coupons</div>
                </div>
              </div>
            </section>

            {/* Total Reports */}
            <section className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-red-500 bg-opacity-75 rounded-full">
                  <MdReportProblem className="w-8 h-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">{44}</h4>
                  <div className="text-gray-500">Total Reports</div>
                </div>
              </div>
            </section>

            {/* Weekly Orders */}
            <section className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-orange-500 bg-opacity-75 rounded-full">
                  <FaShoppingCart className="w-8 h-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">152</h4>
                  <div className="text-gray-500">Weekly Orders</div>
                </div>
              </div>
            </section>

            {/* Weekly Income */}
            <section className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-green-500 bg-opacity-75 rounded-full">
                  <FaMoneyBillWave className="w-8 h-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    Rp 550.000
                  </h4>
                  <div className="text-gray-500">Weekly Income</div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8"></div>

        {/* users title */}
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium text-gray-700">Orders</h3>
          <button
            onClick={() => toast('coming soon')}
            className="px-4 py-2 text-white bg-green-500 border rounded-md focus:outline-none focus:ring-4 focus:ring-green-300 hover:bg-green-600"
          >
            Add New Order
          </button>
        </div>

        {/* table using gridjs */}

        <div className="mt-8"></div>
      </div>
    </main>
  )
}
