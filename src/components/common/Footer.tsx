import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer: FC = () => {
  return (
    <footer className="dark:bg-dark-900 container mx-auto max-w-7xl rounded-t-xl bg-white px-4 py-12 sm:px-6 lg:py-10 lg:px-8 xl:px-10">
      <article className="xl:grid xl:grid-cols-3 xl:gap-8">
        {/* logo with description and social links */}
        <section className="mt-4 xl:col-span-1">
          {/* logo */}
          <Image
            className="h-10 w-10 rounded"
            src="/images/trishop.png"
            alt="trishop logo"
            width={25}
            height={25}
          />
          {/* description */}
          <p className="mt-4 text-base leading-6 text-black">
            Created with 🔥 and 💖 by 🎂 lovers.
          </p>
          {/* social links */}
          <div className="mt-8 flex">
            <Link href="https://www.linkedin.com/in/rifandani/">
              <a className="" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6 text-blue-500 hover:text-blue-700" />
              </a>
            </Link>

            <Link href="https://www.instagram.com/3richkey">
              <a className="ml-6" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6 text-red-500 hover:text-red-700" />
              </a>
            </Link>

            <Link href="https://github.com/rifandani/trishop">
              <a className="ml-6" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Github</span>
                <FaGithub className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </a>
            </Link>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          {/* left menu p-0 */}
          <menu className="p-0 md:grid md:grid-cols-2 md:gap-8">
            {/* sitemaps */}
            <div>
              <h4 className="text-sm font-semibold uppercase leading-5 tracking-wider text-gray-500">
                Sitemaps
              </h4>
              <ul className="mt-4">
                <li>
                  <Link href="/products">
                    <a className="footer__text-link">Products</a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/cart">
                    <a className="footer__text-link">Cart</a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/cart/checkout">
                    <a className="footer__text-link">Checkout</a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="mt-12 md:mt-0">
              <h4 className="text-sm font-semibold uppercase leading-5 tracking-wider text-gray-500">
                Resources
              </h4>
              <ul className="mt-4">
                <li>
                  <Link href="/blogs">
                    <a className="footer__text-link">Blogs</a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/stores">
                    <a className="footer__text-link">Stores</a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/marketplaces">
                    <a className="footer__text-link">Marketplaces</a>
                  </Link>
                </li>
              </ul>
            </div>
          </menu>

          {/* right menu p-0 */}
          <menu className="p-0 md:grid md:grid-cols-2 md:gap-8">
            {/* company */}
            <div>
              <h4 className="text-sm font-semibold uppercase leading-5 tracking-wider text-gray-500">
                Company
              </h4>
              <ul className="mt-4">
                <li>
                  <Link href="/about">
                    <a className="footer__text-link">About</a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/contact">
                    <a className="footer__text-link">Contact</a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/career">
                    <a className="footer__text-link">Career</a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* other */}
            <div className="mt-12 md:mt-0">
              <h4 className="text-sm font-semibold uppercase leading-5 tracking-wider text-gray-500">
                Other
              </h4>
              <ul className="mt-4">
                <li>
                  <Link href="/faq">
                    <a className="footer__text-link">FAQ</a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/terms">
                    <a className="footer__text-link">Terms & Conditions</a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/privacy">
                    <a className="footer__text-link">Privacy Policy</a>
                  </Link>
                </li>
              </ul>
            </div>
          </menu>
        </section>
      </article>

      {/* bottom copyright */}
      <article className="dark:border-dark-900 mt-12 border-t border-gray-200 pt-8">
        <p className="text-base leading-6 text-gray-500 xl:text-center">
          © {new Date().getFullYear()} Trishop. All rights reserved.
        </p>
      </article>
    </footer>
  )
}

export default Footer
