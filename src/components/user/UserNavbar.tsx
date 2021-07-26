import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaReact, FaHome, FaSearch, FaBars, FaCpanel } from 'react-icons/fa'
// files
import useLocalStorage from 'hooks/useLocalStorage'
import { UserPayload } from 'contexts/UserReducer'
import { ChildrenProps } from 'types'
import { logout } from 'services/auth'

export default function UserNavbar({ children }: ChildrenProps): JSX.Element {
  // hooks
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)
  const [, setUser] = useLocalStorage<UserPayload>('user', null) // local storage
  const { pathname, push } = useRouter()

  async function onLogout(): Promise<void> {
    try {
      // call logout API
      await logout()

      // remove user in local storage
      setUser(null)

      // push back to home and toast
      await push('/')
      toast.info('Logout success')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    <article className="w-full h-screen overflow-hidden bg-gray-200">
      <div>
        <div className="flex h-screen bg-gray-200">
          {/*  div dgn onCLick, biar bisa keluar dari toggle sidebar */}
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
                <FaReact className="w-12 h-12 text-blue-500" />

                <span className="mx-2 text-2xl font-semibold text-white">
                  Dashboard
                </span>
              </div>
            </div>

            <nav className="mt-10">
              <Link href="/">
                <a className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                  <FaHome className="w-6 h-6" />

                  <span className="mx-3">Home</span>
                </a>
              </Link>

              <Link href="/user/dashboard">
                <a
                  className={`flex items-center mt-4 py-2 px-6 ${
                    pathname === '/user/dashboard'
                      ? 'bg-gray-700 bg-opacity-25 text-gray-100'
                      : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
                  }`}
                >
                  <FaCpanel className="w-6 h-6" />

                  <span className="mx-3">Dashboard</span>
                </a>
              </Link>
            </nav>
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-orange-500">
              <div className="flex items-center">
                {/* burger toggle button */}
                <button
                  className="text-gray-500 focus:outline-none lg:hidden"
                  onClick={() => setToggleSidebar((prevState) => !prevState)}
                >
                  <FaBars className="w-6 h-6 hover:text-orange-500" />
                </button>

                {/* search input */}
                <div className="relative mx-4 lg:mx-0">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaSearch className="w-5 h-5 text-gray-500" />
                  </span>

                  <input
                    className="w-32 pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-500"
                    type="text"
                    placeholder="Search"
                  />
                </div>
              </div>

              <div className="flex items-center">
                {/* dropdown */}
                <div className="relative">
                  <button
                    className="relative block w-8 h-8 overflow-hidden transition duration-500 ease-in-out transform rounded-full shadow focus:outline-none hover:scale-125"
                    onClick={() => setToggleDropdown((prevState) => !prevState)}
                  >
                    <img
                      className="object-cover w-full h-full"
                      src="/images/trishop.png"
                      alt="admin image"
                    />
                  </button>

                  {/* div dgn onCLick, biar bisa keluar dari dropdown profile  */}
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
                    <button
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-red-500 hover:text-white"
                      type="button"
                      onClick={onLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {children}
          </div>
        </div>
      </div>
    </article>
  )
}
