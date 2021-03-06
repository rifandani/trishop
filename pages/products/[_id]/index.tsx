import { GetStaticPaths, GetStaticProps } from 'next';
// files
import Nav from '../../../components/Nav';
import ProductDetail from '../../../components/ProductDetail';
import { Product as Prod } from '../../../contexts/CartReducer';
import Product from '../../../mongo/models/Product';
import connectDB, { disconnectDB } from '../../../mongo/config/connectDB';

export default function ProductDetailPage({ product }: { product: Prod }) {
  return (
    <div className="flex flex-col mt-3 space-y-12 lg:mt-5">
      <Nav />

      <ProductDetail product={product} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await connectDB();
  const _id = params?._id;
  const productObj: Prod = await Product.findById(_id);

  const product = {
    _id: productObj._id.toString(),
    labels: productObj.labels,
    images: productObj.images,
    title: productObj.title,
    price: productObj.price,
    stock: productObj.stock,
    desc: productObj.desc,
    createdAt: productObj.createdAt.toString(),
    updatedAt: productObj.updatedAt.toString(),
    __v: productObj.__v,
  };

  if (!productObj) {
    return {
      notFound: true,
    };
  }

  await disconnectDB();
  return {
    props: { product },
    revalidate: 3,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();
  const products: Prod[] = await Product.find();

  const paths = products.map((product) => ({
    params: { _id: product._id.toString() },
  }));

  return {
    paths,
    fallback: false, // means other routes should 404
  };
};
