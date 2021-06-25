import { useRouter } from 'next/router'
import { useState } from 'react'
// files
import CategoryItem from 'components/CategoryItem'
import { IProduct } from 'types/Product'

interface CategoriesProps {
  labels: string[]
  queryProducts: IProduct[]
}

export default function Categories({
  labels,
  queryProducts,
}: CategoriesProps): JSX.Element {
  const [selected, setSelected] = useState<string>('All')
  const { push } = useRouter()

  async function querying(label: string) {
    await push(`?_label=${label}`)

    setSelected(label)
  }

  return (
    <div className="mt-20 bg-white">
      <main className="my-8">
        <div className="container px-4 mx-auto">
          <h3 className="text-2xl font-medium text-center text-gray-700">
            {selected.toLocaleUpperCase()}
          </h3>
          <p className="mt-1 text-sm text-center text-gray-500">
            {queryProducts.length} Products
          </p>

          <article className="flex items-center justify-center w-full h-20 px-4 py-2 my-2 space-x-3 overflow-y-auto">
            {labels.map((label, i: number) => (
              <section
                key={i}
                onClick={() => querying(label)}
                className="px-4 py-1 transition duration-500 transform border rounded-lg shadow-lg cursor-pointer hover:bg-orange-200 hover:scale-125"
              >
                <p className="font-light uppercase">{label}</p>
              </section>
            ))}
          </article>

          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {queryProducts.map((product) => (
              <CategoryItem key={product._id} product={product} />
            ))}
          </div>

          {/* pagination */}
          <div className="flex justify-center">
            <div className="flex mt-8 rounded-md">
              <a
                href="#"
                className="px-4 py-2 ml-0 leading-tight text-blue-700 bg-white border border-r-0 border-gray-200 rounded-l hover:bg-blue-500 hover:text-white"
              >
                <span>Previous</span>
              </a>
              <a
                href="#"
                className="px-4 py-2 leading-tight text-blue-700 bg-white border border-r-0 border-gray-200 hover:bg-blue-500 hover:text-white"
              >
                <span>1</span>
              </a>
              <a
                href="#"
                className="px-4 py-2 leading-tight text-blue-700 bg-white border border-r-0 border-gray-200 hover:bg-blue-500 hover:text-white"
              >
                <span>2</span>
              </a>
              <a
                href="#"
                className="px-4 py-2 leading-tight text-blue-700 bg-white border border-r-0 border-gray-200 hover:bg-blue-500 hover:text-white"
              >
                <span>3</span>
              </a>
              <a
                href="#"
                className="px-4 py-2 leading-tight text-blue-700 bg-white border border-gray-200 rounded-r hover:bg-blue-500 hover:text-white"
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
