import Image from 'next/image';
import Link from 'next/link';
import { FaCartPlus } from 'react-icons/fa';

export default function ProductCard({
  _id,
  imageName,
  imageUrl,
  title,
  stock,
  desc,
  labels,
}: any) {
  return (
    <section className="flex flex-col overflow-hidden shadow-lg">
      <div className="relative flex-shrink-0">
        <Image
          className="object-cover w-full h-56"
          src={imageUrl}
          alt={`Cover for ${imageName}`}
          width={520}
          height={260}
          priority={true}
        />
        <span className="absolute bottom-0 right-0 inline-flex items-center px-3 py-1 mr-4 -mb-3 text-xs font-medium leading-tight text-orange-800 bg-orange-200 border rounded-full">
          stock: {stock}
        </span>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col justify-between flex-1 p-6 bg-white">
          <div>
            <Link href={`/products/${encodeURIComponent(_id)}`}>
              <a className="block text-xl font-semibold leading-7 text-gray-800 hover:underline">
                {title}
              </a>
            </Link>

            <p className="mt-3 text-base leading-6 text-gray-500">{desc}</p>
          </div>

          <p className="mt-3 text-sm font-medium leading-5">
            {labels &&
              labels.map((label: any, i: number) => (
                <a key={i} href="/" className="inline-block">
                  <span className="inline-flex items-center px-3 py-1 mr-2 text-xs font-medium leading-tight text-blue-800 bg-blue-200 rounded-full hover:underline">
                    {label}
                  </span>
                </a>
              ))}
          </p>
        </div>

        {/* button */}
        <div className="flex items-center p-6 bg-gradient-to-t from-orange-200 to-white">
          <button className="flex items-center mx-auto font-bold rounded-full py-4 px-8 shadow text-white bg-orange-800 hover:underline">
            <FaCartPlus className="text-white mr-2" /> Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}
