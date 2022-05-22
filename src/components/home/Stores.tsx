/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { FC } from 'react'
import { BsArrowRight } from 'react-icons/bs'

const Stores: FC = () => {
  return (
    <article className="min-w-screen relative bg-white py-16">
      <div className="container mx-auto px-10 sm:px-5">
        <div className="w-full flex-wrap-reverse lg:flex">
          {/* images */}
          <div className="w-full lg:w-1/2 xl:w-2/3">
            <section className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              <img
                className="shadow-pop-bl object-cover shadow-md"
                src="/images/store2.jpg"
                alt="store1"
              />
              <img
                className="shadow-pop-bl object-cover shadow-md"
                src="/images/store2.jpg"
                alt="store2"
              />
              <img
                className="shadow-pop-bl object-cover shadow-md"
                src="/images/store2.jpg"
                alt="store3"
              />
              <img
                className="shadow-pop-bl object-cover shadow-md"
                src="/images/store3.jpg"
                alt="store4"
              />
              <img
                className="shadow-pop-bl object-cover shadow-md"
                src="/images/store3.jpg"
                alt="store5"
              />
              <img
                className="shadow-pop-bl object-cover shadow-md"
                src="/images/store3.jpg"
                alt="store6"
              />
            </section>
          </div>

          {/* content */}
          <div className="mt-10 ml-0 w-full lg:mt-0 lg:ml-10 lg:w-1/2 lg:flex-1 xl:w-1/3">
            <div className="bg-orange-800 px-20 py-5 text-white lg:h-full">
              <p className="mt-2 text-sm uppercase italic">Stores</p>
              <p className="mt-10 mb-5 text-2xl font-bold">
                Find us in many places
              </p>
              <p className="text-justify leading-7">
                We strive to always bring convenience to you. Our
                continuously-growing outlets are located at all over Indonesia,
                where you can indulge yourself or with loved ones within a
                luxurious environment and warm, inviting ambiance that will make
                you feel right at home.
              </p>

              <div className="mt-8">
                <Link href="/stores">
                  <a className="flex items-center text-orange-300 hover:text-orange-500">
                    <div className="flex-initial">See more details</div>
                    <BsArrowRight className="ml-3 w-4 flex-shrink" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Stores
