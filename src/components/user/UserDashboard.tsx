import { FC } from 'react'
import {
  FaMoneyBillWave,
  FaShoppingBag,
  FaShoppingCart,
  FaTicketAlt,
  FaUserFriends,
} from 'react-icons/fa'
import { MdReportProblem } from 'react-icons/md'
import { toast } from 'react-toastify'

const UserDashboard: FC = () => {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200">
      <div className="container mx-auto px-6 py-8">
        {/* dashboard title */}
        <h3
          className="text-3xl font-medium text-gray-700"
          data-cy="user-dashboard"
        >
          User Dashboard
        </h3>

        <div className="mt-4">
          <div className="-mx-6 flex flex-wrap">
            {/* Total Users */}
            <section className="w-full px-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
                <div className="rounded-full bg-indigo-500 bg-opacity-75 p-3">
                  <FaUserFriends className="h-8 w-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">{11}</h4>
                  <div className="text-gray-500">Total Users</div>
                </div>
              </div>
            </section>

            {/* Total Products */}
            <section className="mt-6 w-full px-6 sm:mt-0 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
                <div className="rounded-full bg-pink-500 bg-opacity-75 p-3">
                  <FaShoppingBag className="h-8 w-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">{22}</h4>
                  <div className="text-gray-500">Total Products</div>
                </div>
              </div>
            </section>

            {/* Total Coupons */}
            <section className="mt-6 w-full px-6 sm:w-1/2 xl:mt-0 xl:w-1/3">
              <div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
                <div className="rounded-full bg-blue-500 bg-opacity-75 p-3">
                  <FaTicketAlt className="h-8 w-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">{33}</h4>
                  <div className="text-gray-500">Total Coupons</div>
                </div>
              </div>
            </section>

            {/* Total Reports */}
            <section className="mt-6 w-full px-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
                <div className="rounded-full bg-red-500 bg-opacity-75 p-3">
                  <MdReportProblem className="h-8 w-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">{44}</h4>
                  <div className="text-gray-500">Total Reports</div>
                </div>
              </div>
            </section>

            {/* Weekly Orders */}
            <section className="mt-6 w-full px-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
                <div className="rounded-full bg-orange-500 bg-opacity-75 p-3">
                  <FaShoppingCart className="h-8 w-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">152</h4>
                  <div className="text-gray-500">Weekly Orders</div>
                </div>
              </div>
            </section>

            {/* Weekly Income */}
            <section className="mt-6 w-full px-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
                <div className="rounded-full bg-green-500 bg-opacity-75 p-3">
                  <FaMoneyBillWave className="h-8 w-8 text-white" />
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
            className="rounded-md border bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
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

export default UserDashboard
