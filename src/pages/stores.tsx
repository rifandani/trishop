import { FaStoreAlt } from 'react-icons/fa'
// files
import Nav from '../components/Nav'
import Store from '../components/Store'

export default function Stores() {
  return (
    <div className="flex flex-col">
      <Nav />

      <main className="py-20 bg-white lg:pt-28 lg:mt-3">
        <div className="container flex flex-col items-center justify-center px-4 pt-2 pb-8 mx-auto sm:px-6 lg:px-8">
          {/* title */}
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold leading-tight tracking-widest text-yellow-800 uppercase bg-yellow-200 rounded-full">
            Get the best from us
          </p>

          <h2 className="flex justify-center text-3xl font-bold leading-none tracking-tight text-center text-gray-900 b-6 sm:text-4xl md:mx-auto">
            <FaStoreAlt className="w-8 h-8 mr-3 text-yellow-800" />
            <span className="relative">Our Stores</span>
          </h2>

          {/* content */}
          <Store
            imgSrc="images/store1.jpg"
            imgAlt="Store #1"
            rank="#1"
            address="Jl Gejayan,"
            city="Yogyakarta"
            desc="Our first store is opened in Jalan Gejayan Gang Sambu 1C. We open this store with a hope that we can be the best custom cake business."
          />

          <Store
            imgSrc="images/store2.jpg"
            imgAlt="Store #2"
            rank="#2"
            address="Jl Prapatan,"
            city="Balikpapan"
            desc="Our second store is opened in Jalan Prapatan RT 10 No 35. We open this store with a hope that we can expand more our business network."
          />
        </div>
      </main>
    </div>
  )
}
