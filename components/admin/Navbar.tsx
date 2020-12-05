import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  FaReact,
  FaHome,
  FaSearch,
  FaBars,
  FaUserPlus,
  FaFolderPlus,
  FaCpanel,
} from 'react-icons/fa';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
// files
import { options } from '../../utils/config';

export default function Navbar({ children, userId }: any) {
  const { pathname, push } = useRouter();

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  async function logout() {
    Cookies.remove('auth'); // remove auth cookie

    // push back to home and toast
    await push('/');
    toast.success('Logout success', {
      ...options,
      position: 'bottom-left',
    });
  }

  return (
    <article className="w-full h-screen overflow-hidden bg-gray-200">
      <div>
        <div className="flex h-screen bg-gray-200">
          {/*  div dgn onCLick, biar bisa keluar dari toggle sidebar */}
          {/* @click="sidebarOpen = false" */}
          <div
            className={`fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden ${
              toggleSidebar ? 'block' : 'hidden'
            }`}
            onClick={() => setToggleSidebar((prevState) => !prevState)}
          ></div>

          <div
            className={`fixed z-30 inset-y-0 left-0 w-64 bg-gray-900 overflow-y-auto transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
              toggleSidebar
                ? 'translate-x-0 ease-out'
                : '-translate-x-full ease-in'
            }`}
          >
            <div className="flex flex-row items-center justify-center mt-8">
              <div className="flex items-center">
                <FaReact className="h-12 w-12 text-blue-500" />

                <span className="text-white text-2xl mx-2 font-semibold">
                  Dashboard
                </span>
              </div>
            </div>

            <nav className="mt-10">
              <Link href="/">
                <a className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                  <FaHome className="h-6 w-6" />

                  <span className="mx-3">Home</span>
                </a>
              </Link>

              <Link href={`/admin/dashboard?_id=${userId}`}>
                <a
                  className={`flex items-center mt-4 py-2 px-6 ${
                    pathname === '/admin/dashboard'
                      ? 'bg-gray-700 bg-opacity-25 text-gray-100'
                      : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
                  }`}
                >
                  <FaCpanel className="h-6 w-6" />

                  <span className="mx-3">Dashboard</span>
                </a>
              </Link>

              <Link href="/admin/add/user">
                <a
                  className={`flex items-center mt-4 py-2 px-6 ${
                    pathname === '/admin/add/user'
                      ? 'bg-gray-700 bg-opacity-25 text-gray-100'
                      : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
                  }`}
                >
                  <FaUserPlus className="h-6 w-6" />

                  <span className="mx-3">Add User</span>
                </a>
              </Link>

              <Link href="/admin/add/product">
                <a
                  className={`flex items-center mt-4 py-2 px-6 ${
                    pathname === '/admin/add/product'
                      ? 'bg-gray-700 bg-opacity-25 text-gray-100'
                      : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
                  }`}
                >
                  <FaFolderPlus className="h-6 w-6" />

                  <span className="mx-3">Add Product</span>
                </a>
              </Link>
            </nav>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-orange-500">
              <div className="flex items-center">
                {/* burger toggle button */}
                <button
                  className="text-gray-500 focus:outline-none lg:hidden"
                  onClick={() => setToggleSidebar((prevState) => !prevState)}
                >
                  <FaBars className="h-6 w-6 hover:text-orange-500" />
                </button>

                {/* search input */}
                <div className="relative mx-4 lg:mx-0">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaSearch className="h-5 w-5 text-gray-500" />
                  </span>

                  <input
                    className="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-500"
                    type="text"
                    placeholder="Search"
                  />
                </div>
              </div>

              <div className="flex items-center">
                {/* dropdown */}
                <div className="relative">
                  {/* @click="dropdownOpen = ! dropdownOpen" */}
                  <button
                    className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none transition duration-500 ease-in-out transform hover:scale-125"
                    onClick={() => setToggleDropdown((prevState) => !prevState)}
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=296&amp;q=80"
                      alt="Your avatar"
                    />
                  </button>

                  {/* div dgn onCLick, biar bisa keluar dari dropdown profile  */}
                  {/* @click="dropdownOpen = false" */}
                  <div
                    className={`fixed inset-0 h-full w-full z-10 ${
                      toggleDropdown ? '' : 'hidden'
                    }`}
                    onClick={() => setToggleDropdown((prevState) => !prevState)}
                  ></div>

                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 ${
                      toggleDropdown ? '' : 'hidden'
                    }`}
                  >
                    <Link href="/admin/profile">
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-500 hover:text-white">
                        Profile
                      </a>
                    </Link>
                    <span
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white cursor-pointer"
                    >
                      Logout
                    </span>
                  </div>
                </div>
              </div>
            </header>

            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
