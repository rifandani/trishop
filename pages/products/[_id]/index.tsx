import { GetStaticPaths, GetStaticProps } from 'next';
// files
import Nav from '../../../components/Nav';
import ProductDetail from '../../../components/ProductDetail';
import Product from '../../../mongo/models/Product';

export default function ProductDetailPage({ product }: any) {
  return (
    <div className="flex flex-col mt-3 space-y-12 lg:mt-5">
      <Nav />

      <ProductDetail product={product} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const _id = ctx?.params?._id;

    const product = await Product.findById(_id);

    return {
      props: { product },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await Product.find();

    // Get the paths we want to pre-render based on products
    const paths = products.map((product: any) => ({
      params: { _id: product._id },
    }));

    // We'll pre-render only these paths at build time.
    return {
      paths: paths,
      fallback: false, // means other routes should 404
    };
  } catch (err) {
    return {
      paths: [],
      fallback: false, // means other routes should 404
    };
  }
};
