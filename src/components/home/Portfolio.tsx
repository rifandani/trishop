/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { FC } from 'react'
import { BsArrowRight } from 'react-icons/bs'

const Portfolio: FC = () => {
  return (
    <article className="container mx-auto py-16">
      <div className="flex flex-wrap">
        <section className="mb-8 w-full px-4 lg:mb-0 lg:w-1/2">
          <div className="flex h-full flex-col justify-center bg-orange-800 px-20 py-5 text-white">
            <p className="mt-2 text-sm uppercase italic">Showcase</p>
            <h2 className="mt-10 mb-5 text-2xl font-bold ">
              Witness the beauty of our works
            </h2>
            <p className="mb-6 max-w-sm text-justify leading-7">
              We love cakes and chocolates - so do our customers. We constantly
              obsess over sourcing the highest quality ingredients. We always
              use local organic eggs, creamy local butter and highest quality
              local flour. Our motivation for using these ingredients are love
              for great food and respect for the environment.
            </p>
            <Link href="/products">
              <a className="flex items-center text-orange-300 hover:text-orange-500">
                <div className="flex-initial">See all products</div>
                <BsArrowRight className="ml-3 w-4 flex-shrink" />
              </a>
            </Link>
          </div>
        </section>

        <section className="px-4 lg:w-1/2">
          <div className="-m-2 flex h-full w-full flex-wrap">
            <div className="w-1/2 p-2">
              <img
                className="shadow-pop-bl object-cover shadow-md"
                src="/images/show1.jpg"
                alt="show1"
              />
            </div>

            <div className="w-1/2 p-2">
              <img
                className="shadow-pop-bl object-cover shadow-md"
                src="/images/show1.jpg"
                alt="show2"
              />
            </div>

            <div className="w-1/2 p-2">
              <img
                className="shadow-pop-bl object-cover shadow-md"
                src="/images/show2.jpg"
                alt="show3"
              />
            </div>

            <div className="w-1/2 p-2">
              <img
                className="shadow-pop-bl w-full object-cover shadow-md"
                src="/images/show2.jpg"
                alt="show4"
              />
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}

export default Portfolio
