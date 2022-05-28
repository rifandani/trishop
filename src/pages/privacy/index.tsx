import Footer from 'components/common/Footer'
import Nav from 'components/common/Nav'
import PrivacyComp from 'components/privacy/PrivacyComp'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { FaLock } from 'react-icons/fa'

const PrivacyPage: NextPage = () => {
  return (
    <div className="flex flex-col ">
      <NextSeo
        title="Privacy Policy"
        description="We take the protection of your personal information very seriously. This policy is intended to help you understand how we collect, use and safeguard the information you provide on our website."
      />

      <Nav />

      {/* main content */}
      <main className="min-h-screen bg-white py-20 lg:mt-3 lg:pt-28">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 pt-2 pb-8 sm:px-6 lg:px-8">
          {/* title */}
          <p className="mb-4 inline-block rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold uppercase leading-tight tracking-widest text-orange-800">
            We protect your privacy
          </p>

          <h1 className="b-6 mb-12 flex justify-center text-center font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <FaLock className="mr-3 h-8 w-8 text-orange-800" />
            <span className="relative mt-1 sm:mt-0">Privacy Policy</span>{' '}
          </h1>

          {/* main content */}
          <PrivacyComp />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PrivacyPage
