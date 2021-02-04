import { GetStaticPaths, GetStaticProps } from 'next';
// files
import Navbar from '../../../components/admin/Navbar';
import EditProduct from '../../../components/admin/EditProduct';
import Product from '../../../mongo/models/Product';

export default function ProductEdit({ product }: any) {
  return (
    <Navbar>
      <EditProduct product={product} />
    </Navbar>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // params contains the product '_id'.
    // If the route is like /products/1, then params.id is 1
    const product = await Product.findById(params?.id);

    return { props: { product } };
  } catch {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // GET products
    const products = await Product.find();

    // Get the paths we want to pre-render based on products _id
    const paths = products.map((product: any) => ({
      params: { id: product._id },
    }));

    // We'll pre-render only these paths at build time.
    return {
      paths,
      fallback: false, // means other routes should 404.
    };
  } catch (err) {
    return {
      paths: [],
      fallback: false, // means other routes should 404.
    };
  }
};
