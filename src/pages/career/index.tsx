import Head from 'next/head'
import { MdWork } from 'react-icons/md'
// files
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import CareerComp from 'components/career/CareerComp'

export default function CareerPage() {
  return (
    <div className="flex flex-col ">
      <Head>
        <title>Trishop - Career</title>
      </Head>

      <Nav />

      {/* main content */}
      <main className="min-h-screen py-20 bg-white lg:pt-28 lg:mt-3">
        <div className="container flex flex-col items-center justify-center px-4 pt-2 pb-8 mx-auto sm:px-6 lg:px-8">
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold leading-tight tracking-widest text-orange-800 uppercase bg-orange-200 rounded-full">
            On pursuit of perfection
          </p>

          <h1 className="flex justify-center mb-12 font-sans text-3xl font-bold leading-none tracking-tight text-center text-gray-900 b-6 sm:text-4xl md:mx-auto">
            <MdWork className="w-8 h-8 mr-3 text-orange-800" />
            <span className="relative mt-1 sm:mt-0">Join Our Team</span>{' '}
          </h1>

          {/* content */}
          <CareerComp />
        </div>
      </main>

      <Footer />
    </div>
  )
}
