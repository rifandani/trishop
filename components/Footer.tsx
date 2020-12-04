import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="container px-4 py-12 mx-auto bg-white max-w-7xl sm:px-6 lg:py-10 lg:px-8 xl:px-10 dark:bg-dark-900 rounded-t-xl">
      <article className="xl:grid xl:grid-cols-3 xl:gap-8">
        {/* logo with description and social links */}
        <section className="xl:col-span-1 mt-4">
          {/* logo */}
          <img className="h-10 w-10" src="/images/rifandani-icon.png" />
          {/* description */}
          <p className="mt-4 text-base leading-6 text-black">
            Created with 💖 and 🔥 by 🎂 lovers.
          </p>
          {/* social links */}
          <div className="flex mt-8">
            <Link href="/facebook">
              <a
                className="text-gray-500 hover:text-gray-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebook className="w-6 h-6 text-blue-500 hover:text-blue-700" />
              </a>
            </Link>
            <Link href="/instagram">
              <a
                className="ml-6 text-gray-500 hover:text-gray-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram className="w-6 h-6 text-red-500 hover:text-red-700" />
              </a>
            </Link>
            <Link href="/whatsapp">
              <a
                className="ml-6 text-gray-500 hover:text-gray-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Whatsapp</span>
                <FaWhatsapp className="w-6 h-6 text-green-500 hover:text-green-700" />
              </a>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-2 mt-8 gap-8 xl:mt-0 xl:col-span-2">
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
                    <a className="text-base leading-6 text-black hover:underline">
                      Products
                    </a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/cart">
                    <a className="text-base leading-6 text-black hover:underline">
                      Cart
                    </a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/checkout">
                    <a className="text-base leading-6 text-black hover:underline">
                      Checkout
                    </a>
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
                    <a className="text-base leading-6 text-black hover:underline">
                      Blog
                    </a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/stores">
                    <a className="text-base leading-6 text-black hover:underline">
                      Stores
                    </a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/marketplace">
                    <a className="text-base leading-6 text-black hover:underline">
                      Marketplaces
                    </a>
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
                    <a className="text-base leading-6 text-black hover:underline">
                      About
                    </a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/contact">
                    <a className="text-base leading-6 text-black hover:underline">
                      Contact
                    </a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/career">
                    <a className="text-base leading-6 text-black hover:underline">
                      Career
                    </a>
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
                    <a className="text-base leading-6 text-black hover:underline">
                      FAQ
                    </a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/terms">
                    <a className="text-base leading-6 text-black hover:underline">
                      Terms & Conditions
                    </a>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/privacy">
                    <a className="text-base leading-6 text-black hover:underline">
                      Privacy Policy
                    </a>
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
  );
};

export default Footer;
