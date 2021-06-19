import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
// files
import useLocalStorage from 'hooks/useLocalStorage'
import { WishlistContext } from 'contexts/WishlistContext'
import { UserPayload } from 'contexts/UserReducer'
import { RootState } from 'redux/store'

export default function Nav(): JSX.Element {
  // hooks
  const { push } = useRouter()
  const [user, setUser] = useLocalStorage<UserPayload>('user', null)
  const cart = useSelector((state: RootState) => state.cart) // redux -> cart
  const { wishlist } = useContext(WishlistContext) // wishlist context
  const [toggle, setToggle] = useState<boolean>(true) // toggle hamburger menu
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false) // toggle dropdown menu

  const pushToAdminDashboard = (): Promise<boolean> => push('/admin/dashboard')
  const pushToUserDashboard = (): Promise<boolean> => push('/user/dashboard')

  const login = (): Promise<boolean> => push('/login')

  const logout = async (): Promise<void> => {
    try {
      // call logout API
      await axios.get('/auth/logout')

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

  return (
    <nav className="fixed top-0 z-30 w-full text-white bg-gradient-to-r from-orange-800 via-orange-400 to-orange-200">
      <article className="container flex flex-wrap items-center justify-between w-full py-2 mx-auto mt-0">
        {/* logo */}
        <section className="flex items-center pl-3">
          <Link href="/">
            <a className="flex items-center space-x-2 text-2xl font-bold text-white no-underline hover:no-underline lg:text-3xl">
              <Image
                className="inline w-10 h-10 rounded"
                src="/images/trishop.png"
                alt="trishop logo"
                width={50}
                height={50}
              />

              <p className="mt-1 text-md">Trishop</p>
            </a>
          </Link>
        </section>

        {/* nav toggle */}
        <section className="block pr-4 lg:hidden">
          <button
            onClick={() => setToggle(!toggle)}
            className="flex items-center px-3 py-2 text-orange-800 border border-orange-800 rounded appearance-none hover:text-orange-500 hover:border-orange-500 focus:outline-none"
          >
            {/* burger menu */}
            <GiHamburgerMenu className="w-3 h-3" />
          </button>
        </section>

        {/* nav content */}
        <section
          className={`${
            toggle ? 'hidden' : 'flex-grow'
          } z-20 w-full p-4 text-black lg:flex lg:items-center lg:w-auto lg:mt-0 lg:p-0 lg:bg-transparent`}
        >
          <ul className="items-center justify-end flex-1 list-reset lg:flex">
            <li className="mr-3">
              <Link href="/cart">
                <a className="inline-block px-4 pt-4 pb-3 bg-white rounded-full lg:mr-2">
                  <div className="flex space-x-2">
                    <FaShoppingCart className="text-xl text-orange-800 transition duration-500 transform hover:scale-150 hover:text-orange-400" />
                    <p className="text-orange-800">{cart.count}</p>
                  </div>
                </a>
              </Link>
            </li>

            <li className="mt-2 mr-3 lg:mt-0">
              <Link href="/wishlist">
                <a className="inline-block px-4 pt-4 pb-3 bg-white rounded-full lg:mr-2">
                  <div className="flex space-x-2">
                    <FaHeart className="text-xl text-red-800 transition duration-500 transform hover:scale-150 hover:text-orange-400" />
                    <p className="text-orange-800">
                      {wishlist ? wishlist.length : 0}
                    </p>
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
                className="relative block w-12 h-12 mt-3 overflow-hidden transition duration-500 ease-in-out transform rounded-full shadow lg:mt-0 focus:outline-none hover:scale-125"
                onClick={() => setToggleDropdown((prevState) => !prevState)}
              >
                <img
                  className="object-cover w-full h-full"
                  src="/images/trishop.png"
                  alt="trishop image"
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
                className={`absolute left-0 right-auto lg:left-auto lg:right-0 mt-3 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 ${
                  toggleDropdown ? '' : 'hidden'
                }`}
              >
                {user ? (
                  <button
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-orange-500 hover:text-white"
                    type="button"
                    onClick={
                      user.role === 'ADMIN'
                        ? pushToAdminDashboard
                        : pushToUserDashboard
                    }
                  >
                    Dashboard
                  </button>
                ) : null}

                <button
                  className={`${
                    user ? 'hover:bg-red-500' : 'hover:bg-orange-500'
                  } w-full px-4 py-2 text-sm text-left text-gray-700 hover:text-white`}
                  type="button"
                  onClick={user ? logout : login}
                >
                  {user ? 'Logout' : 'Login'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* mobile content */}
      {/* {toggle ? (
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
            ) : null} */}

      <hr className="py-0 my-0 border-b border-gray-100 opacity-25" />
    </nav>
  )
}
