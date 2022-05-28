import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IProductProps } from 'types/Product'

const ProductCard: FC<IProductProps> = ({ product }) => {
  //#region GENERAL
  const { images, stock, price, _id, title, desc, labels } = product

  const { push } = useRouter()
  //#endregion

  //#region ACTION HANDLER
  const onClickLabel = (label: string) =>
    push(`/products/categories?label=${label}`)
  //#endregion

  return (
    <section className="card-shadow flex flex-col overflow-hidden shadow-lg">
      <div className="relative flex-shrink-0">
        <Image
          className="h-56 w-full object-cover"
          src={images[0].imageUrl}
          alt={`Cover for ${images[0].imageName}`}
          width={520}
          height={260}
          priority={true}
        />
        <span className="absolute bottom-0 left-0 ml-6 -mb-3 inline-flex items-center rounded-full border bg-orange-200 px-3 py-1 text-xs font-medium leading-tight text-orange-800">
          stock:{' '}
          <strong className="ml-1 text-base text-orange-800">{stock}</strong>
        </span>

        <span className="absolute bottom-0 right-0 mr-6 -mb-3 inline-flex items-center rounded-full border bg-orange-200 px-3 py-1 text-xs font-medium leading-tight text-orange-800">
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

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <div>
            <Link href={`/products/${encodeURIComponent(_id)}`}>
              <a className="block text-xl font-semibold leading-7 text-gray-800 hover:text-orange-800 hover:underline">
                {title}
              </a>
            </Link>

            <p className="mt-3 text-base italic leading-6 text-gray-500 line-clamp-3 hover:line-clamp-none">
              {desc}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {labels?.map((label: string, i: number) => (
              <button
                className="product-label-btn"
                key={i}
                onClick={() => onClickLabel(label)}
              >
                {label}
              </button>
            ))}
          </div>
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

export default ProductCard
