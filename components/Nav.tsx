import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaShoppingCart } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
// files
import { options } from '../utils/config';

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const [cookie] = useState(Cookies.get('auth') || '');

  const { push } = useRouter();

  function toggleBurger() {
    setToggle((prevState) => !prevState);
  }

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
    <nav className="fixed w-full z-30 top-0 text-white bg-gradient-to-r from-orange-800 via-orange-400 to-orange-200">
      <article className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        {/* logo */}
        <section className="pl-3 flex items-center">
          <Link href="/">
            <a className="text-white no-underline hover:no-underline font-bold text-2xl lg:text-3xl">
              <img
                className="h-10 w-10 inline fill-current"
                src="/images/rifandani-icon.png"
              />

              <span> TriShop</span>
            </a>
          </Link>
        </section>

        {/* nav toggle */}
        <section className="block lg:hidden pr-4">
          <button
            onClick={toggleBurger}
            className="flex items-center px-3 py-2 border rounded text-orange-800 border-orange-800 hover:text-orange-500 hover:border-orange-500 appearance-none focus:outline-none"
          >
            {/* burger menu */}
            <GiHamburgerMenu className="h-3 w-3" />
          </button>
        </section>

        {/* nav content */}
        <section
          className={`${
            toggle ? null : 'hidden'
          } z-20 w-full flex-grow p-4 text-black lg:flex lg:items-center lg:w-auto lg:mt-0 lg:p-0 lg:bg-transparent`}
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <Link href="/products">
                <a className="inline-block py-2 px-4 text-white font-bold hover:text-orange-800 hover:underline">
                  Products
                </a>
              </Link>
            </li>
            <li className="mr-3">
              <Link href="/stores">
                <a className="inline-block py-2 px-4 text-white font-bold hover:text-orange-800 hover:underline">
                  Stores
                </a>
              </Link>
            </li>
            <li className="mr-3">
              <Link href="/cart">
                <a className="inline-block py-2 mt-1 px-4 lg:mr-2">
                  <FaShoppingCart className="text-green-500 text-xl transform transition duration-500 hover:scale-150 hover:text-green-400" />
                </a>
              </Link>
            </li>
          </ul>

          {cookie ? (
            <button
              onClick={logout}
              className="mx-auto font-bold rounded-full py-4 px-8 shadow mt-4 bg-white text-red-500 hover:underline lg:mx-0 lg:mt-0"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="mx-auto font-bold rounded-full py-4 px-8 shadow mt-4 bg-white text-orange-800 hover:underline lg:mx-0 lg:mt-0">
                Login
              </button>
            </Link>
          )}
        </section>
      </article>

      {/* mobile content */}
      {/* {toggle ? (
        <article className="w-full container mx-auto flex-wrap items-center justify-center mt-0 pb-5">
          <section className="w-full ">
            <Link href="/" >
              <a className="inline-block py-2 px-4 text-white font-bold hover:text-orange-800 hover:underline">
                Products
              </a>
            </Link>
          </section>
          <section className="w-full ">
            <Link href="/" >
              <a className="inline-block py-2 px-4 text-white font-bold hover:text-orange-800 hover:underline">
                Stores
              </a>
            </Link>
          </section>
          <section className="w-full ">
            <Link href="/" >
              <a className="inline-block py-2 px-4 text-white font-bold hover:text-orange-800 hover:underline">
                Marketplaces
              </a>
            </Link>
          </section>
          <section className="w-full ">
            <Link href="/login" >
              <button className="mx-auto font-bold rounded-full py-4 px-8 shadow mt-2 ml-4 bg-white text-orange-800 hover:underline">
                Login
              </button>
            </Link>
          </section>
        </article>
      ) : null} */}

      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};

export default Nav;
