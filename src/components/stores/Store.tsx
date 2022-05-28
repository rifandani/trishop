import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { FaLocationArrow } from 'react-icons/fa'

export interface StoreProps {
  imgSrc: string
  imgAlt: string
  rank: string
  address: string
  city: string
  desc: string
}

const Store: FC<StoreProps> = ({
  imgSrc,
  imgAlt,
  rank,
  address,
  city,
  desc,
}) => {
  return (
    <div className="min-w-screen mx-auto mt-12 flex bg-white px-8">
      {/* image */}
      <article className="w-1/2">
        <div className="flex flex-col overflow-hidden rounded-lg shadow-2xl">
          <div className="flex h-8 items-center bg-gray-900 text-white">
            <div className="ml-3 h-3 w-3 rounded-full bg-red-400"></div>
            <div className="ml-2 h-3 w-3 rounded-full bg-orange-400"></div>
            <div className="ml-2 h-3 w-3 rounded-full bg-green-400"></div>
          </div>

          <Image
            className="h-64 w-full object-cover"
            src={imgSrc}
            alt={imgAlt}
            width={200}
            height={200}
            priority
          />
        </div>
      </article>

      {/* content */}
      <article className="relative h-full w-1/2 pl-12">
        <h1 className="text-sm font-bold uppercase tracking-wide text-orange-800">
          Store {rank}
        </h1>

        <h2 className="mt-5 text-4xl font-bold leading-tight text-gray-900">
          {address}
          <br /> {city}.
        </h2>
        <p className="mt-3 text-base text-gray-500">{desc}</p>
        <Link href="/">
          <a className="mt-8 flex transform items-center font-medium text-orange-500 transition duration-500 hover:skew-x-12 hover:text-orange-800 hover:underline">
            <span>View in Google Maps</span>
            <FaLocationArrow className="ml-3 h-4 w-4" />
          </a>
        </Link>
      </article>
    </div>
  )
}

export default Store
