import { useRouter } from 'next/router'
import { MdReportProblem } from 'react-icons/md'
import {
  FaUserFriends,
  FaShoppingCart,
  FaShoppingBag,
  FaMoneyBillWave,
  FaTicketAlt,
} from 'react-icons/fa'
// files
import TableUsers from './TableUsers'
import TableProducts from './TableProducts'
import TableCoupons from './TableCoupons'
import SwiperReports from './SwiperReports'
import LoadingSpinner from 'components/LoadingSpinner'
// custom hooks
import useGetProducts from 'hooks/useGetProducts'
import useGetUsers from 'hooks/useGetUsers'
import useGetCoupons from 'hooks/useGetCoupons'
import useGetReports from 'hooks/useGetReports'

export default function AdminDashboard(): JSX.Element {
  // hooks
  const { push } = useRouter()
  const { users, usersIsLoading, usersIsError } = useGetUsers()
  const { products, productsIsLoading, productsIsError } = useGetProducts()
  const { coupons, couponsIsLoading, couponsIsError } = useGetCoupons()
  const { reports, reportsIsLoading, reportsIsError } = useGetReports()

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="container px-6 py-8 mx-auto">
        {/* dashboard title */}
        <h3
          className="text-3xl font-medium text-gray-700"
          data-cy="admin-dashboard"
        >
          Admin Dashboard
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {usersIsError && 'Error'}
                    {usersIsLoading && 'Loading...'}
                    {users?.length}
                  </h4>
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {productsIsError && 'Error'}
                    {productsIsLoading && 'Loading...'}
                    {products?.length}
                  </h4>
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {couponsIsError && 'Error'}
                    {couponsIsLoading && 'Loading...'}
                    {coupons?.length}
                  </h4>
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {reportsIsError && 'Error'}
                    {reportsIsLoading && 'Loading...'}
                    {reports?.length}
                  </h4>
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
                  <h4 className="text-2xl font-semibold text-gray-700">999</h4>
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
                    Rp 99.999.999
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
          <h3 className="text-3xl font-medium text-gray-700">Users</h3>
          <button
            onClick={() => push('/admin/add/user')}
            className="px-4 py-2 text-white bg-green-500 border rounded-md focus:outline-none focus:ring-4 focus:ring-green-300 hover:bg-green-600"
          >
            Add New User
          </button>
        </div>

        {/* table using gridjs */}
        {usersIsLoading && <LoadingSpinner className="mt-6" />}
        {users && <TableUsers users={users} />}

        <div className="mt-8"></div>

        {/* Products title */}
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium text-gray-700">Products</h3>
          <button
            onClick={() => push('/admin/add/product')}
            className="px-4 py-2 text-white bg-green-500 border rounded-md focus:outline-none focus:ring-4 focus:ring-green-300 hover:bg-green-600"
          >
            Add New Product
          </button>
        </div>

        {/* table using gridjs */}
        {productsIsLoading && <LoadingSpinner className="mt-6" />}
        {products && <TableProducts products={products} />}

        <div className="mt-8"></div>

        {/* Coupons title */}
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium text-gray-700">Coupons</h3>
          <button
            onClick={() => push('/admin/add/coupon')}
            className="px-4 py-2 text-white bg-green-500 border rounded-md focus:outline-none focus:ring-4 focus:ring-green-300 hover:bg-green-600"
          >
            Add New Coupon
          </button>
        </div>

        {/* table using gridjs */}
        {couponsIsLoading && <LoadingSpinner className="mt-6" />}
        {coupons && <TableCoupons coupons={coupons} />}

        <div className="mt-8"></div>

        {/* Reports title */}
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium text-gray-700">Reports</h3>
        </div>

        {reportsIsLoading && <LoadingSpinner className="mt-6" />}
        {reports && <SwiperReports reports={reports} />}
      </div>
    </main>
  )
}
