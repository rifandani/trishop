import { GetStaticPaths, GetStaticProps } from 'next';
import Axios from 'axios';
// files
import Nav from '../../../components/Nav';
import ProductDetail from '../../../components/ProductDetail';

export default function ProductDetailPage({ product }: any) {
  return (
    <div className="flex flex-col space-y-12 mt-3 lg:mt-5">
      <Nav />

      <ProductDetail product={product} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const _id = ctx?.params?._id;

  const res = await Axios(`http://localhost:3000/api/admin/product?_id=${_id}`);
  const product = res?.data;

  return {
    props: { product },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await Axios('http://localhost:3000/api/admin/products');
  const products = res?.data;

  // Get the paths we want to pre-render based on products
  const paths = products.map((product: any) => ({
    params: { _id: product._id },
  }));

  // We'll pre-render only these paths at build time.
  return {
    paths: paths,
    fallback: false, // means other routes should 404
  };
};
