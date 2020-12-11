import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Axios from 'axios';
// files
import Product from '../../../mongo/models/Product';
import { Image } from '../../../contexts/CartReducer';
import Categories from '../../../components/Categories';
import Nav from '../../../components/Nav';

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
  queryProducts: PRODUCT[];
}

const CategoriesIndex = ({ queryProducts }: CategoryIndexProps) => {
  const [products, setProducts] = useState([]);

  const { data, error } = useSWR(
    'http://localhost:3000/api/admin/categories',
    (url) => Axios.get(url).then((res) => res.data),
  );

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const res = await Axios('http://localhost:3000/api/admin/products');
    setProducts(res.data);
  }

  if (error) return <h1>ERROR</h1>;

  return (
    <>
      <Nav />

      <Categories
        labels={data}
        products={products}
        setProducts={setProducts}
        queryProducts={queryProducts}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const _label = ctx.query._label as string;

  const queryProducts = await Product.find({
    labels: { $in: [_label] },
  })
    .limit(10)
    .sort({ createdAt: -1 }); // desc

  return {
    props: { queryProducts: JSON.stringify(queryProducts) }, // harus di serialize ke JSON dlu
  };
};

export default CategoriesIndex;
