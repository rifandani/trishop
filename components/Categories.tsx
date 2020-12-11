import { useRouter } from 'next/router';
import { useState } from 'react';
// files
import CategoryItem from './CategoryItem';
import { PRODUCT } from '../pages/products/categories';

interface CategoriesProps {
  labels: string[];
  products: PRODUCT[];
  setProducts: any;
  queryProducts: PRODUCT[];
}

export default function Categories({
  labels,
  products,
  setProducts,
  queryProducts,
}: CategoriesProps) {
  const [selected, setSelected] = useState<string>('All');
  const { push } = useRouter();

  async function querying(label: string) {
    await push(`?_label=${label}`);

    const selectedCategory = JSON.parse((queryProducts as unknown) as string);

    setSelected(label);
    setProducts(selectedCategory);
  }

  return (
    <div className="bg-white mt-20">
      <main className="my-8">
        <div className="container mx-auto px-4">
          <h3 className="text-gray-700 text-2xl font-medium text-center">
            {selected}
          </h3>
          <p className="mt-1 text-sm text-gray-500 text-center">
            {products.length} Products
          </p>

          <article className="my-2 py-2 px-4 h-20 w-full flex items-center justify-center space-x-3 overflow-y-auto">
            {labels &&
              labels.map((label, i: number) => (
                <section
                  key={i}
                  onClick={() => querying(label)}
                  className="hover:bg-orange-200 border rounded-lg shadow-lg px-4 py-1 cursor-pointer transform transition duration-500 hover:scale-125"
                >
                  <p className="font-light uppercase">{label}</p>
                </section>
              ))}
          </article>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {products &&
              products.map((product) => (
                <CategoryItem key={product._id} product={product} />
              ))}
          </div>

          {/* pagination */}
          <div className="flex justify-center">
            <div className="flex rounded-md mt-8">
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"
              >
                <span>Previous</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>1</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>2</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>3</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"
              >
                <span>Next</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
