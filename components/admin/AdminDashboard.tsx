import {
  FaUserFriends,
  FaShoppingCart,
  FaShoppingBag,
  FaMoneyBillWave,
} from 'react-icons/fa';
import Router from 'next/router';
// files
import TableUsers from './TableUsers';
import useUsers from '../../hooks/useUsers';
import TableProducts from './TableProducts';
import useProducts from '../../hooks/useProducts';

export default function AdminDashboard() {
  const { users, usersIsLoading, usersIsError } = useUsers();
  const { products, productsIsLoading, productsIsError } = useProducts();

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="container mx-auto px-6 py-8">
        {/* dashboard title */}
        <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>

        <div className="mt-4">
          <div className="flex flex-wrap -mx-6">
            {/* Total Users */}
            <section className="w-full px-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-indigo-500 bg-opacity-75">
                  <FaUserFriends className="h-8 w-8 text-white" />
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
            <section className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-pink-500 bg-opacity-75">
                  <FaShoppingBag className="h-8 w-8 text-white" />
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
            <section className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-yellow-500 bg-opacity-75">
                  <FaShoppingCart className="h-8 w-8 text-white" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">152</h4>
                  <div className="text-gray-500">Weekly Orders</div>
                </div>
              </div>
            </section>

            {/* Weekly Income */}
            <section className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-green-500 bg-opacity-75">
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
          <h3 className="text-gray-700 text-3xl font-medium">Users</h3>
          <button
            onClick={() => Router.push('/admin/add/user', '/admin/add/user')}
            className="py-2 px-4 border rounded-md text-white bg-green-500 hover:bg-green-600"
          >
            Add New User
          </button>
        </div>

        {/* table using gridjs */}
        <TableUsers />

        <div className="mt-8"></div>

        {/* Products title */}
        <div className="flex items-center justify-between">
          <h3 className="text-gray-700 text-3xl font-medium">Products</h3>
          <button
            onClick={() =>
              Router.push('/admin/add/product', '/admin/add/product')
            }
            className="py-2 px-4 border rounded-md text-white bg-green-500 hover:bg-green-600"
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
