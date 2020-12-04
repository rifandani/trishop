import { GetStaticProps } from 'next';
import { useState } from 'react';
import { GiCakeSlice } from 'react-icons/gi';
import Axios from 'axios';
// files
import Nav from '../../components/Nav';
import ProductCard from '../../components/ProductCard';

export default function Products({ products }: any) {
  const [productss] = useState(products || []);

  return (
    <div className="flex flex-col">
      <Nav />

      <main className="py-20 bg-white lg:pt-28 lg:mt-3">
        <div className="container flex flex-col items-center justify-center px-4 pt-2 pb-8 mx-auto sm:px-6 lg:px-8">
          {/* title */}
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold leading-tight tracking-widest text-orange-800 uppercase bg-orange-200 rounded-full">
            Get the best from us
          </p>

          <h2 className="flex justify-center font-sans text-3xl font-bold leading-none tracking-tight text-center text-gray-900 b-6 sm:text-4xl md:mx-auto">
            <GiCakeSlice className="w-8 h-8 mt-1 mr-3 text-orange-800" />
            <span className="relative">Our Featured Products</span>{' '}
          </h2>

          {/* content cards */}
          <article className="grid max-w-lg gap-10 mx-auto mt-12 md:grid-cols-2 lg:grid-cols-3 md:max-w-none">
            {productss &&
              productss.map((product: any) => (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  imageName={product.images[0].imageName}
                  imageUrl={product.images[0].imageUrl}
                  title={product.title}
                  stock={product.stock}
                  desc={product.desc}
                  labels={product.labels}
                />
              ))}
          </article>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await Axios.get('http://localhost:3000/api/admin/products');
    const products = res?.data;

    // kalau products tidak a da
    if (!products) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: { products },
    };
  } catch (err) {
    return { notFound: true };
  }
};
