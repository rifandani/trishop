import CareerComp from 'components/career/CareerComp'
import Footer from 'components/common/Footer'
import Nav from 'components/common/Nav'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { MdWork } from 'react-icons/md'

const CareerPage: NextPage = () => {
  return (
    <div className="flex flex-col ">
      <NextSeo
        title="Career"
        description="Stay up to date with the latest updates from Trishop. Products, announcements, and articles about cake, chocolates, and baking in general."
      />

      <Nav />

      {/* main content */}
      <main className="min-h-screen bg-white py-20 lg:mt-3 lg:pt-28">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 pt-2 pb-8 sm:px-6 lg:px-8">
          <p className="mb-4 inline-block rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold uppercase leading-tight tracking-widest text-orange-800">
            On pursuit of perfection
          </p>

          <h1 className="b-6 mb-12 flex justify-center text-center font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <MdWork className="mr-3 h-8 w-8 text-orange-800" />
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

export default CareerPage
