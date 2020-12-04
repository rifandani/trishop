import { GetStaticPaths, GetStaticProps } from 'next';
import Axios from 'axios';
// files
import Navbar from '../../../components/admin/Navbar';
import EditProduct from '../../../components/admin/EditProduct';

export default function ProductEdit({ product }: any) {
  return (
    <Navbar>
      <EditProduct product={product} />
    </Navbar>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the product '_id'.
  // If the route is like /products/1, then params.id is 1
  const res = await Axios.get(
    `http://localhost:3000/api/admin/product?_id=${params?.id}`,
  );
  const product = res?.data;

  return { props: { product } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get products
  const res = await Axios.get('http://localhost:3000/api/admin/products');
  const products = res?.data;

  // Get the paths we want to pre-render based on products _id
  const paths = products.map((product: any) => ({
    params: { id: product._id },
  }));

  // We'll pre-render only these paths at build time.
  return {
    paths,
    fallback: false, // means other routes should 404.
  };
};
