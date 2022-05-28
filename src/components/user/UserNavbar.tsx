import { UserPayload } from 'contexts/UserReducer'
import useLocalStorage from 'hooks/useLocalStorage'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { FaBars, FaCpanel, FaHome, FaReact, FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { logout } from 'services/auth'
import { ChildrenProps } from 'types'

const UserNavbar: FC<ChildrenProps> = ({ children }) => {
  //#region GENERAL
  const { pathname, push } = useRouter()
  const [, setUser] = useLocalStorage<UserPayload>('user', null) // local storage

  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)
  //#endregion

  //#region ACTION HANDLER
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
  //#endregion

  return (
    <article className="h-screen w-full overflow-hidden bg-gray-200">
      <div>
        <div className="flex h-screen bg-gray-200">
          {/*  div dgn onCLick, biar bisa keluar dari toggle sidebar */}
          <div
            className={`fixed inset-0 z-20 bg-black opacity-50 transition-opacity lg:hidden ${
              toggleSidebar ? 'block' : 'hidden'
            }`}
            onClick={() => setToggleSidebar((prevState) => !prevState)}
          ></div>

          <div
            className={`fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto bg-gray-900 transition duration-300 lg:static lg:inset-0 lg:translate-x-0 ${
              toggleSidebar
                ? 'translate-x-0 ease-out'
                : '-translate-x-full ease-in'
            }`}
          >
            <div className="mt-8 flex flex-row items-center justify-center">
              <div className="flex items-center">
                <FaReact className="h-12 w-12 text-blue-500" />

                <span className="mx-2 text-2xl font-semibold text-white">
                  Dashboard
                </span>
              </div>
            </div>

            <nav className="mt-10">
              <Link href="/">
                <a className="mt-4 flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                  <FaHome className="h-6 w-6" />

                  <span className="mx-3">Home</span>
                </a>
              </Link>

              <Link href="/user/dashboard">
                <a
                  className={`mt-4 flex items-center py-2 px-6 ${
                    pathname === '/user/dashboard'
                      ? 'bg-gray-700 bg-opacity-25 text-gray-100'
                      : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
                  }`}
                >
                  <FaCpanel className="h-6 w-6" />

                  <span className="mx-3">Dashboard</span>
                </a>
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <header className="flex items-center justify-between border-b-4 border-orange-500 bg-white px-6 py-4">
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
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaSearch className="h-5 w-5 text-gray-500" />
                  </span>

                  <input
                    className="form-input w-32 rounded-md pl-10 pr-4 focus:border-indigo-500 sm:w-64"
                    type="text"
                    placeholder="Search"
                  />
                </div>
              </div>

              <div className="flex items-center">
                {/* dropdown */}
                <div className="relative">
                  <button
                    className="relative block h-8 w-8 transform overflow-hidden rounded-full shadow transition duration-500 ease-in-out hover:scale-125 focus:outline-none"
                    onClick={() => setToggleDropdown((prevState) => !prevState)}
                  >
                    <Image
                      src="/images/trishop.png"
                      alt="user photo"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      priority
                    />
                  </button>

                  {/* div dgn onCLick, biar bisa keluar dari dropdown profile  */}
                  <div
                    className={`fixed inset-0 z-10 h-full w-full ${
                      toggleDropdown ? '' : 'hidden'
                    }`}
                    onClick={() => setToggleDropdown((prevState) => !prevState)}
                  ></div>

                  <div
                    className={`absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-md bg-white shadow-xl ${
                      toggleDropdown ? '' : 'hidden'
                    }`}
                  >
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-500 hover:text-white"
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

export default UserNavbar
