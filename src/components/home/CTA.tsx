import Link from 'next/link'
import { FC } from 'react'

const CTA: FC = () => {
  return (
    <article className="bg-gradient-to-r from-orange-800 via-orange-400 to-orange-200">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl sm:leading-10">
          Want to know more about us?
          <br />
          <span className="text-orange-300">
            We have some interesting journey!
          </span>
        </h2>

        <section className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-full shadow">
            <Link href="/about">
              <a className="focus:shadow-outline inline-flex items-center justify-center rounded-full border border-transparent bg-orange-800 px-5 py-3 text-base font-medium leading-6 text-white hover:underline focus:outline-none">
                About Us
              </a>
            </Link>
          </div>

          <div className="ml-3 inline-flex rounded-full shadow">
            <Link href="/contact">
              <a className="focus:shadow-outline inline-flex items-center justify-center rounded-full border border-transparent bg-white px-5 py-3 text-base font-medium leading-6 text-orange-800 hover:underline focus:outline-none">
                Contact Us
              </a>
            </Link>
          </div>
        </section>
      </div>
    </article>
  )
}

export default CTA
