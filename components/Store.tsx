import { FaLocationArrow } from 'react-icons/fa';

export interface StoreProps {
  imgSrc: string;
  imgAlt: string;
  rank: string;
  address: string;
  city: string;
  desc: string;
}

export default function Store({
  imgSrc,
  imgAlt,
  rank,
  address,
  city,
  desc,
}: StoreProps) {
  return (
    <div className="flex px-8 mx-auto mt-12 bg-white min-w-screen">
      {/* image */}
      <article className="w-1/2">
        <div className="flex flex-col overflow-hidden rounded-lg shadow-2xl">
          <div className="flex items-center h-8 text-white bg-gray-900">
            <div className="w-3 h-3 ml-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 ml-2 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 ml-2 bg-green-400 rounded-full"></div>
          </div>
          <img className="object-cover w-full h-64" src={imgSrc} alt={imgAlt} />
        </div>
      </article>

      {/* content */}
      <article className="relative w-1/2 h-full pl-12">
        <p className="text-sm font-bold tracking-wide text-orange-800 uppercase">
          Store {rank}
        </p>
        <h2 className="mt-5 text-4xl font-bold leading-tight text-gray-900">
          {address}
          <br /> {city}.
        </h2>
        <p className="mt-3 text-base text-gray-600">{desc}</p>
        <a
          href="/"
          className="flex items-center inline-block mt-8 font-medium text-orange-300 transform transition duration-500 hover:underline hover:skew-x-12 hover:text-orange-800"
        >
          <span>View in Google Maps</span>
          <FaLocationArrow className="w-4 h-4 ml-3" />
        </a>
      </article>
    </div>
  );
}
