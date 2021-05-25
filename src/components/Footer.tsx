import Link from 'next/link'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="container px-4 py-12 mx-auto bg-white max-w-7xl sm:px-6 lg:py-10 lg:px-8 xl:px-10 dark:bg-dark-900 rounded-t-xl">
      <article className="xl:grid xl:grid-cols-3 xl:gap-8">
        {/* logo with description and social links */}
        <section className="mt-4 xl:col-span-1">
          {/* logo */}
          <img
            className="w-10 h-10 rounded"
            src="/images/trishop.png"
            alt="trishop logo"
          />
          {/* description */}
          <p className="mt-4 text-base leading-6 text-black">
            Created with 💖 and 🔥 by 🎂 lovers.
          </p>
          {/* social links */}
          <div className="flex mt-8">
            <a
              className="text-gray-500 hover:text-gray-500"
              href="https://www.linkedin.com/in/rifandani/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="w-6 h-6 text-blue-500 hover:text-blue-700" />
            </a>

            <a
              className="ml-6 text-gray-500 hover:text-gray-500"
              href="https://www.instagram.com/3richkey"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Instagram</span>
              <FaInstagram className="w-6 h-6 text-red-500 hover:text-red-700" />
            </a>

            <a
              className="ml-6 text-gray-500 hover:text-gray-500"
              href="https://github.com/rifandani"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Github</span>
              <FaGithub className="w-6 h-6 text-green-500 hover:text-green-700" />
            </a>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8 mt-8 xl:mt-0 xl:col-span-2">
          {/* left menu p-0 */}
          <menu className="p-0 md:grid md:grid-cols-2 md:gap-8">
            {/* sitemaps */}
            <div>
              <h4 className="text-sm font-semibold leading-5 tracking-wider text-gray-500 uppercase">
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
                  <Link href="/checkout">
                    <a className="footer__text-link">Checkout</a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="mt-12 md:mt-0">
              <h4 className="text-sm font-semibold leading-5 tracking-wider text-gray-500 uppercase">
                Resources
              </h4>
              <ul className="mt-4">
                <li>
                  <Link href="/blog">
                    <a className="footer__text-link">Blog</a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/stores">
                    <a className="footer__text-link">Stores</a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/marketplace">
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
              <h4 className="text-sm font-semibold leading-5 tracking-wider text-gray-500 uppercase">
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
              <h4 className="text-sm font-semibold leading-5 tracking-wider text-gray-500 uppercase">
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
      <article className="pt-8 mt-12 border-t border-gray-200 dark:border-dark-900">
        <p className="text-base leading-6 text-gray-500 xl:text-center">
          © {new Date().getFullYear()} Rifandani. All rights reserved.
        </p>
      </article>
    </footer>
  )
}

export default Footer
