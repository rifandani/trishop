import AboutComp from 'components/about/AboutComp'
import AboutTeam from 'components/about/AboutTeam'
import Footer from 'components/common/Footer'
import Nav from 'components/common/Nav'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { FaCode, FaUsers } from 'react-icons/fa'

const AboutPage: NextPage = () => {
  return (
    <div className="flex flex-col ">
      <NextSeo
        title="About Us"
        description="Trishop is an online cake shop. We love cake, bakery and chocolates - so do our customers. We constantly obsess over sourcing the highest quality ingredients for our products. Our motivation for using these ingredients are love for great food and respect for the environment."
      />

      <Nav />

      {/* main content */}
      <main className="min-h-screen bg-white py-20 lg:mt-3 lg:pt-28">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 pt-2 pb-8 sm:px-6 lg:px-8">
          {/* about us */}
          <p className="mb-4 inline-block rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold uppercase leading-tight tracking-widest text-orange-800">
            The spirit of trishop
          </p>

          <h1 className="b-6 mb-12 flex justify-center text-center font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <FaCode className="mr-3 h-8 w-8 text-orange-800" />
            <span className="relative mt-1 sm:mt-0">About Us</span>{' '}
          </h1>

          {/* about us content */}
          <AboutComp />

          {/* our team */}
          <p className="mt-20 mb-4 inline-block rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold uppercase leading-tight tracking-widest text-orange-800">
            Meet our amazing team
          </p>

          <h1 className="b-6 mb-12 flex justify-center text-center font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <FaUsers className="mr-3 h-8 w-8 text-orange-800" />
            <span className="relative mt-1 sm:mt-0">Our Team</span>{' '}
          </h1>

          {/* our team content */}
          <AboutTeam />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage
