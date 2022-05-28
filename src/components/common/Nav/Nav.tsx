import { UserPayload } from 'contexts/UserReducer'
import useWriteLocalStorage from 'hooks/useWriteLocalStorage'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { toast } from 'react-toastify'
import { useAppSelector } from 'redux/store'
import { logout } from 'services/auth'

const Nav: FC = () => {
  //#region GENERAL
  const { push } = useRouter()
  const { cart, wishlist } = useAppSelector((state) => state)
  const [user, setUser] = useWriteLocalStorage<UserPayload>('user', null)

  const [toggle, setToggle] = useState<boolean>(true)
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)
  //#endregion

  //#region ACTION HANDLER
  const pushToAdminDashboard = (): Promise<boolean> => push('/admin/dashboard')
  const pushToUserDashboard = (): Promise<boolean> => push('/user/dashboard')

  const onLogin = (): Promise<boolean> => push('/login')

  const onLogout = async (): Promise<void> => {
    try {
      // call logout API
      await logout()

      // remove user in local storage
      setUser(null)

      // push back to home and toast
      await push('/')
      toast.info('Logout success')
    } catch (err) {
      toast.error(err.message)
      console.error(err)
    }
  }
  //#endregion

  return (
    <nav className="fixed top-0 z-30 w-full bg-gradient-to-r from-orange-800 via-orange-400 to-orange-200 text-white">
      <article className="container mx-auto mt-0 flex w-full flex-wrap items-center justify-between py-2">
        {/* logo */}
        <section className="flex items-center pl-3">
          <Link href="/">
            <a className="flex items-center space-x-2 text-2xl font-bold text-white no-underline hover:no-underline lg:text-3xl">
              <Image
                className="inline h-10 w-10 rounded"
                src="/images/trishop.png"
                alt="trishop logo"
                width={50}
                height={50}
              />

              <p className="text-md mt-1">Trishop</p>
            </a>
          </Link>
        </section>

        {/* nav toggle */}
        <section className="block pr-4 lg:hidden">
          <button
            onClick={() => setToggle(!toggle)}
            className="flex appearance-none items-center rounded border border-orange-800 px-3 py-2 text-orange-800 hover:border-orange-500 hover:text-orange-500 focus:outline-none"
          >
            {/* burger menu */}
            <GiHamburgerMenu className="h-3 w-3" />
          </button>
        </section>

        {/* nav content */}
        <section
          className={`${
            toggle ? 'hidden' : 'flex-grow'
          } z-20 w-full p-4 text-black lg:mt-0 lg:flex lg:w-auto lg:items-center lg:bg-transparent lg:p-0`}
        >
          <ul className="list-reset flex-1 items-center justify-end lg:flex">
            <li className="mr-3">
              <Link href="/cart">
                <a className="inline-block rounded-full bg-white px-4 pt-4 pb-3 lg:mr-2">
                  <div className="flex space-x-2">
                    <FaShoppingCart className="transform text-xl text-orange-800 transition duration-500 hover:scale-150 hover:text-orange-400" />
                    <p className="text-orange-800">{cart.count}</p>
                  </div>
                </a>
              </Link>
            </li>

            <li className="mt-2 mr-3 lg:mt-0">
              <Link href="/wishlist">
                <a className="inline-block rounded-full bg-white px-4 pt-4 pb-3 lg:mr-2">
                  <div className="flex space-x-2">
                    <FaHeart className="transform text-xl text-red-800 transition duration-500 hover:scale-150 hover:text-orange-400" />
                    <p className="text-orange-800">{wishlist.count}</p>
                  </div>
                </a>
              </Link>
            </li>
          </ul>

          {/* profile image with dropdown */}
          <div className="flex items-center">
            {/* dropdown */}
            <div className="relative">
              <button
                className="relative mt-3 block h-12 w-12 transform overflow-hidden rounded-full shadow transition duration-500 ease-in-out hover:scale-125 focus:outline-none lg:mt-0"
                onClick={() => setToggleDropdown((prevState) => !prevState)}
              >
                <Image
                  className="h-full w-full object-cover"
                  src="/images/trishop.png"
                  alt="trishop image"
                  width={50}
                  height={50}
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
                className={`absolute left-0 right-auto z-10 mt-3 w-48 overflow-hidden rounded-md bg-white shadow-xl lg:left-auto lg:right-0 ${
                  toggleDropdown ? '' : 'hidden'
                }`}
              >
                {user && (
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-500 hover:text-white"
                    type="button"
                    onClick={
                      user.role === 'ADMIN'
                        ? pushToAdminDashboard
                        : pushToUserDashboard
                    }
                  >
                    Dashboard
                  </button>
                )}

                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-500 hover:text-white"
                  type="button"
                  onClick={user ? onLogout : onLogin}
                >
                  {user ? 'Logout' : 'Login'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* mobile content */}
      {/* {toggle && (
        <article className="container flex-wrap items-center justify-center w-full pb-5 mx-auto mt-0">
          <section className="w-full ">
            <Link href="/">
              <a className="inline-block px-4 py-2 font-bold text-white hover:text-orange-800 hover:underline">
                Products
              </a>
            </Link>
          </section>
          <section className="w-full ">
            <Link href="/">
              <a className="inline-block px-4 py-2 font-bold text-white hover:text-orange-800 hover:underline">
                Stores
              </a>
            </Link>
          </section>
          <section className="w-full ">
            <Link href="/">
              <a className="inline-block px-4 py-2 font-bold text-white hover:text-orange-800 hover:underline">
                Marketplaces
              </a>
            </Link>
          </section>
          <section className="w-full ">
            <Link href="/login">
              <button className="px-8 py-4 mx-auto mt-2 ml-4 font-bold text-orange-800 bg-white rounded-full shadow hover:underline">
                Login
              </button>
            </Link>
          </section>
        </article>
      )} */}

      <hr className="my-0 border-b border-gray-100 py-0 opacity-25" />
    </nav>
  )
}

export default Nav
