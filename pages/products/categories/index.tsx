import { GetServerSideProps } from 'next';
import useSWR from 'swr';
// files
import Categories from '../../../components/Categories';
import Nav from '../../../components/Nav';
import Product from '../../../mongo/models/Product';
import { Image } from '../../../contexts/CartReducer';
import connectDB, { disconnectDB } from '../../../mongo/config/connectDB';

export interface PRODUCT {
  createdAt: string;
  desc: string;
  images: Image[];
  labels: string[];
  price: number;
  stock: number;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface CategoryIndexProps {
  queryProducts: string;
}

const CategoriesIndex = ({ queryProducts }: CategoryIndexProps) => {
  const { data, error } = useSWR<string[]>('/admin/categories');

  return (
    <>
      <Nav />

      {error && 'Error'}

      {data && (
        <Categories labels={data} queryProducts={JSON.parse(queryProducts)} />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await connectDB();
  const _label = query?._label;

  // if there is no query
  if (!_label) {
    const noLabels = await Product.find();

    await disconnectDB();
    return {
      props: {
        queryProducts: JSON.stringify(noLabels),
      },
    };
  }

  const queryProducts = await Product.find({
    labels: { $in: [_label] },
  })
    .limit(10)
    .sort({ createdAt: -1 }); // desc

  await disconnectDB();
  return {
    props: { queryProducts: JSON.stringify(queryProducts) }, // harus di serialize ke JSON dlu
  };
};

export default CategoriesIndex;
