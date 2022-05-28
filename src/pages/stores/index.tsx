import Footer from 'components/common/Footer'
import Nav from 'components/common/Nav'
import Store from 'components/stores/Store'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { FaStoreAlt } from 'react-icons/fa'

const StorePage: NextPage = () => {
  return (
    <div className="flex flex-col">
      <NextSeo
        title="Stores"
        description="Trishop have been continuously growing since past years. We have branched out to many cities to expand our stores."
      />

      <Nav />

      <main className="bg-white py-20 lg:mt-3 lg:pt-28">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 pt-2 pb-8 sm:px-6 lg:px-8">
          {/* title */}
          <p className="mb-4 inline-block rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold uppercase leading-tight tracking-widest text-orange-800">
            Continuously growing outlets
          </p>

          <h2 className="b-6 flex justify-center text-center text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <FaStoreAlt className="mr-3 h-8 w-8 text-orange-800" />
            <span className="relative">Visit Our Stores</span>
          </h2>

          {/* content */}
          <Store
            imgSrc="/images/store2.jpg"
            imgAlt="Store #2"
            rank="#2"
            address="Jl Gejayan,"
            city="Yogyakarta"
            desc="Our first store is opened in Jalan Gejayan Gang Sambu 1C. We open this store with a hope that we can be the best custom cake business."
          />

          <Store
            imgSrc="/images/store3.jpg"
            imgAlt="Store #3"
            rank="#3"
            address="Jl Prapatan,"
            city="Balikpapan"
            desc="Our second store is opened in Jalan Prapatan RT 10 No 35. We open this store with a hope that we can expand more our business network."
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default StorePage
