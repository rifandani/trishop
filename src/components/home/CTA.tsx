import Link from 'next/link'

const CTA = () => {
  return (
    <article className="bg-gradient-to-r from-orange-800 via-orange-400 to-orange-200">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl sm:leading-10">
          Want to know more about us?
          <br />
          <span className="text-orange-300">
            We have some interesting journey!
          </span>
        </h2>

        <section className="flex mt-8 lg:flex-shrink-0 lg:mt-0">
          <div className="inline-flex rounded-full shadow">
            <Link href="/about">
              <a className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white bg-orange-800 border border-transparent rounded-full hover:underline focus:outline-none focus:shadow-outline">
                About Us
              </a>
            </Link>
          </div>

          <div className="inline-flex ml-3 rounded-full shadow">
            <Link href="/contact">
              <a className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-orange-800 bg-white border border-transparent rounded-full hover:underline focus:outline-none focus:shadow-outline">
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
