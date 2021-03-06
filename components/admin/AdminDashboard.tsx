import {
  FaUserFriends,
  FaShoppingCart,
  FaShoppingBag,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
// files
import TableUsers from './TableUsers';
import useUsers from '../../hooks/useUsers';
import TableProducts from './TableProducts';
import useProducts from '../../hooks/useProducts';

export default function AdminDashboard() {
  const { users, usersIsLoading, usersIsError } = useUsers();
  const { products, productsIsLoading, productsIsError } = useProducts();
  const { push } = useRouter();

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="container px-6 py-8 mx-auto">
        {/* dashboard title */}
        <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

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
                    {users && users.length}
                    {usersIsLoading && 'Loading...'}
                    {usersIsError && 'Error'}
                  </h4>
                  <div className="text-gray-500">Total Users</div>
                </div>
              </div>
            </section>

            {/* Available Products */}
            <section className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-pink-500 bg-opacity-75 rounded-full">
                  <FaShoppingBag className="w-8 h-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {products && products.length}
                    {productsIsLoading && 'Loading...'}
                    {productsIsError && 'Error'}
                  </h4>
                  <div className="text-gray-500">Available Products</div>
                </div>
              </div>
            </section>

            {/* Weekly Orders */}
            <section className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-yellow-500 bg-opacity-75 rounded-full">
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
          <h3 className="text-3xl font-medium text-gray-700">Users</h3>
          <button
            onClick={() => push('/admin/add/user', '/admin/add/user')}
            className="px-4 py-2 text-white bg-green-500 border rounded-md hover:bg-green-600"
          >
            Add New User
          </button>
        </div>

        {/* table using gridjs */}
        <TableUsers />

        <div className="mt-8"></div>

        {/* Products title */}
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium text-gray-700">Products</h3>
          <button
            onClick={() => push('/admin/add/product', '/admin/add/product')}
            className="px-4 py-2 text-white bg-green-500 border rounded-md hover:bg-green-600"
          >
            Add New Product
          </button>
        </div>

        {/* table using gridjs */}
        <TableProducts />
      </div>
    </main>
  );
}
