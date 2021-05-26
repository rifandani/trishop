import Image from 'next/image'
import Link from 'next/link'

interface IProductCardProps {
  _id: string
  imageName: string
  imageUrl: string
  title: string
  price: number
  stock: number
  desc: string
  labels: string[]
}

export default function ProductCard({
  _id,
  imageName,
  imageUrl,
  title,
  price,
  stock,
  desc,
  labels,
}: IProductCardProps) {
  return (
    <section className="flex flex-col overflow-hidden shadow-lg card-shadow">
      <div className="relative flex-shrink-0">
        <Image
          className="object-cover w-full h-56"
          src={imageUrl}
          alt={`Cover for ${imageName}`}
          width={520}
          height={260}
          priority={true}
        />
        <span className="absolute bottom-0 left-0 inline-flex items-center px-3 py-1 ml-6 -mb-3 text-xs font-medium leading-tight text-orange-800 bg-orange-200 border rounded-full">
          stock:{' '}
          <strong className="ml-1 text-base text-orange-800">{stock}</strong>
        </span>

        <span className="absolute bottom-0 right-0 inline-flex items-center px-3 py-1 mr-6 -mb-3 text-xs font-medium leading-tight text-orange-800 bg-orange-200 border rounded-full">
          Rp{' '}
          <strong className="mx-1 text-lg text-orange-800">
            {new Intl.NumberFormat('id-ID', {
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(price)}
          </strong>{' '}
          / pcs
        </span>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col justify-between flex-1 p-6 bg-white">
          <div>
            <Link href={`/products/${encodeURIComponent(_id)}`}>
              <a className="block text-xl font-semibold leading-7 text-gray-800 hover:underline hover:text-orange-800">
                {title}
              </a>
            </Link>

            <p className="mt-3 text-base italic leading-6 text-gray-500">
              {desc}
            </p>
          </div>

          <p className="mt-3 text-sm font-medium leading-5">
            {labels?.map((label: string, i: number) => (
              <a key={i} href="/" className="inline-block">
                <span className="inline-flex items-center px-3 py-1 mr-2 text-xs font-medium leading-tight text-blue-800 bg-blue-200 rounded-full hover:opacity-75">
                  {label}
                </span>
              </a>
            ))}
          </p>
        </div>

        {/* button */}
        {/* <div className="flex items-center p-6 bg-gradient-to-t from-orange-200 to-white">
          <button className="flex items-center px-8 py-4 mx-auto font-bold text-white bg-orange-800 rounded-full shadow hover:opacity-75">
            <FaCartPlus className="mr-2 text-white" /> Buy Now
          </button>
        </div> */}
      </div>
    </section>
  )
}
