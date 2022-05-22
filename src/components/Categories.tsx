import CategoryItem from 'components/CategoryItem'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { IProduct } from 'types/Product'

interface Props {
  labels: string[]
  queryProducts: IProduct[]
}

const Categories: FC<Props> = ({ labels, queryProducts }) => {
  //#region GENERAL
  const { push } = useRouter()

  const [selected, setSelected] = useState<string>('All')
  //#endregion

  //#region ACTION HANDLER
  async function querying(label: string) {
    await push(`?_label=${label}`)

    setSelected(label)
  }
  //#endregion

  return (
    <div className="mt-20 bg-white">
      <main className="my-8">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-2xl font-medium text-gray-700">
            {selected.toLocaleUpperCase()}
          </h3>
          <p className="mt-1 text-center text-sm text-gray-500">
            {queryProducts.length} Products
          </p>

          <article className="my-2 flex h-20 w-full items-center justify-center space-x-3 overflow-y-auto px-4 py-2">
            {labels.map((label, i: number) => (
              <section
                key={i}
                onClick={() => querying(label)}
                className="transform cursor-pointer rounded-lg border px-4 py-1 shadow-lg transition duration-500 hover:scale-125 hover:bg-orange-200"
              >
                <p className="font-light uppercase">{label}</p>
              </section>
            ))}
          </article>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {queryProducts.map((product) => (
              <CategoryItem key={product._id} product={product} />
            ))}
          </div>

          {/* pagination */}
          <div className="flex justify-center">
            <div className="mt-8 flex rounded-md">
              <a
                href="#"
                className="ml-0 rounded-l border border-r-0 border-gray-200 bg-white px-4 py-2 leading-tight text-blue-700 hover:bg-blue-500 hover:text-white"
              >
                <span>Previous</span>
              </a>
              <a
                href="#"
                className="border border-r-0 border-gray-200 bg-white px-4 py-2 leading-tight text-blue-700 hover:bg-blue-500 hover:text-white"
              >
                <span>1</span>
              </a>
              <a
                href="#"
                className="border border-r-0 border-gray-200 bg-white px-4 py-2 leading-tight text-blue-700 hover:bg-blue-500 hover:text-white"
              >
                <span>2</span>
              </a>
              <a
                href="#"
                className="border border-r-0 border-gray-200 bg-white px-4 py-2 leading-tight text-blue-700 hover:bg-blue-500 hover:text-white"
              >
                <span>3</span>
              </a>
              <a
                href="#"
                className="rounded-r border border-gray-200 bg-white px-4 py-2 leading-tight text-blue-700 hover:bg-blue-500 hover:text-white"
              >
                <span>Next</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Categories
