import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
// files
import useLocalStorage from 'hooks/useLocalStorage'
import { CartContext } from 'contexts/CartContext'
import { WishlistContext } from 'contexts/WishlistContext'

const Nav = () => {
  // hooks
  const { push } = useRouter()
  const { cart } = useContext(CartContext) // cart context
  const { wishlist } = useContext(WishlistContext) // cart context
  const [, setValue] = useLocalStorage('user', '') // local storage

  const [toggle, setToggle] = useState(true) // toggle hamburger menu
  const [cookie, setCookie] = useState(Cookies.get('auth') || '') // cookie

  const login = (): Promise<boolean> => push('/login')

  const logout = async (): Promise<void> => {
    // remove auth cookie & user local storage
    Cookies.remove('auth')
    setValue('')
    setCookie('')

    // push back to home and toast
    await push('/')
    toast.success('Logout success')
  }

  return (
    <nav className="fixed top-0 z-30 w-full text-white bg-gradient-to-r from-orange-800 via-orange-400 to-orange-200">
      <article className="container flex flex-wrap items-center justify-between w-full py-2 mx-auto mt-0">
        {/* logo */}
        <section className="flex items-center pl-3">
          <Link href="/">
            <a className="flex items-center space-x-2 text-2xl font-bold text-white no-underline hover:no-underline lg:text-3xl">
              {/* <img
                className="inline w-10 h-10 rounded"
                src="/images/trishop.png"
                alt="trishop logo image"
              /> */}
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
            {/* TODO: buat link ke user/admin dashboard */}
            <li className="mr-3">
              <Link href="/cart">
                <a className="inline-block px-4 pt-4 pb-3 bg-white rounded-full lg:mr-2">
                  <div className="flex space-x-2">
                    <FaShoppingCart className="text-xl text-orange-800 transition duration-500 transform hover:scale-150 hover:text-orange-400" />
                    <p className="text-orange-800">{cart ? cart.length : 0}</p>
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

          <button
            onClick={cookie ? logout : login}
            className={cookie ? 'nav__logout-btn' : 'nav__login-btn'}
          >
            {cookie ? 'Logout' : 'Login'}
          </button>

          {/* FIXME: Prop `className` did not match */}
          {/* {cookie && (
            <button onClick={logout} className="nav__logout-btn">
              Logout
            </button>
          )}

          {!cookie && (
            <button onClick={login} className="nav__login-btn">
              Login
            </button>
          )} */}
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

export default Nav
