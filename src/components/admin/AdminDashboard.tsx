import LoadingSpinner from 'components/common/LoadingSpinner'
import { useRouter } from 'next/router'
import { FC } from 'react'
import {
  FaMoneyBillWave,
  FaShoppingBag,
  FaShoppingCart,
  FaTicketAlt,
  FaUserFriends,
} from 'react-icons/fa'
import { MdReportProblem } from 'react-icons/md'
import useSWR from 'swr'
import { HttpResponse } from 'types'
import { APIResponseCoupons } from 'types/Coupon'
import { APIResponseProducts } from 'types/Product'
import { APIResponseReports } from 'types/Report'
import { APIResponseUsers } from 'types/User'
import SwiperReports from './SwiperReports'
import TableCoupons from './TableCoupons'
import TableProducts from './TableProducts'
import TableUsers from './TableUsers'

const AdminDashboard: FC = () => {
  //#region GENERAL
  const { push } = useRouter()
  //#endregion

  //#region ADMIN-USERS SERVICES
  const { data: usersRes, error: usersIsError } = useSWR<
    APIResponseUsers,
    HttpResponse
  >('/admin/users')
  const usersIsLoading = !usersRes && !usersIsError
  //#endregion

  //#region ADMIN-PRODUCTS SERVICE
  const { data: productsRes, error: productsIsError } = useSWR<
    APIResponseProducts,
    HttpResponse
  >('/admin/products')
  const productsIsLoading = !productsRes && !productsIsError
  //#endregion

  //#region ADMIN-COUPONS SERVICE
  const { data: couponsRes, error: couponsIsError } = useSWR<
    APIResponseCoupons,
    HttpResponse
  >('/admin/coupons')
  const couponsIsLoading = !couponsRes && !couponsIsError
  //#endregion

  //#region ADMIN-REPORTS SERVICE
  const { data: reportsRes, error: reportsIsError } = useSWR<
    APIResponseReports,
    HttpResponse
  >('/admin/reports')
  const reportsIsLoading = !reportsRes && !reportsIsError
  //#endregion

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200">
      <div className="container mx-auto px-6 py-8">
        {/* dashboard title */}
        <h3
          className="text-3xl font-medium text-gray-700"
          data-cy="admin-dashboard"
        >
          Admin Dashboard
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {usersIsError && 'Error'}
                    {usersIsLoading && 'Loading...'}
                    {usersRes && usersRes.count}
                  </h4>
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {productsIsError && 'Error'}
                    {productsIsLoading && 'Loading...'}
                    {productsRes && productsRes.count}
                  </h4>
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {couponsIsError && 'Error'}
                    {couponsIsLoading && 'Loading...'}
                    {couponsRes && couponsRes.count}
                  </h4>
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {reportsIsError && 'Error'}
                    {reportsIsLoading && 'Loading...'}
                    {reportsRes && reportsRes.count}
                  </h4>
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
                  <h4 className="text-2xl font-semibold text-gray-700">999</h4>
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
            className="rounded-md border bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Add New User
          </button>
        </div>

        {/* table using gridjs */}
        {usersIsLoading && <LoadingSpinner className="mt-6" />}
        {usersRes && <TableUsers users={usersRes.users} />}

        <div className="mt-8"></div>

        {/* Products title */}
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium text-gray-700">Products</h3>
          <button
            onClick={() => push('/admin/add/product')}
            className="rounded-md border bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Add New Product
          </button>
        </div>

        {/* table using gridjs */}
        {productsIsLoading && <LoadingSpinner className="mt-6" />}
        {productsRes && <TableProducts products={productsRes.products} />}

        <div className="mt-8"></div>

        {/* Coupons title */}
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium text-gray-700">Coupons</h3>
          <button
            onClick={() => push('/admin/add/coupon')}
            className="rounded-md border bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Add New Coupon
          </button>
        </div>

        {/* table using gridjs */}
        {couponsIsLoading && <LoadingSpinner className="mt-6" />}
        {couponsRes && <TableCoupons coupons={couponsRes.coupons} />}

        <div className="mt-8"></div>

        {/* Reports title */}
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium text-gray-700">Reports</h3>
        </div>

        {reportsIsLoading && <LoadingSpinner className="mt-6" />}
        {reportsRes && <SwiperReports reports={reportsRes.reports} />}
      </div>
    </main>
  )
}

export default AdminDashboard
