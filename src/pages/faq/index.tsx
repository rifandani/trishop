import { FaQuestionCircle } from 'react-icons/fa'
import { NextSeo } from 'next-seo'
// files
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import FAQComp from 'components/faq/FAQComp'

export default function FAQPage(): JSX.Element {
  return (
    <div className="flex flex-col ">
      <NextSeo
        title="FAQ"
        description="If you're new to Trishop, this guide will help you learn more about the platform and all of its features."
      />

      <Nav />

      {/* main content */}
      <main className="min-h-screen py-20 bg-white lg:pt-28 lg:mt-3">
        <div className="container flex flex-col items-center justify-center px-4 pt-2 pb-8 mx-auto sm:px-6 lg:px-8">
          {/* title */}
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold leading-tight tracking-widest text-orange-800 uppercase bg-orange-200 rounded-full">
            You ask, We answers
          </p>

          <h1 className="flex justify-center mb-12 font-sans text-3xl font-bold leading-none tracking-tight text-center text-gray-900 b-6 sm:text-4xl md:mx-auto">
            <FaQuestionCircle className="w-8 h-8 mr-3 text-orange-800" />
            <span className="relative mt-1 sm:mt-0">FAQ</span>{' '}
          </h1>

          {/* main content */}
          <FAQComp />
        </div>
      </main>

      <Footer />
    </div>
  )
}
