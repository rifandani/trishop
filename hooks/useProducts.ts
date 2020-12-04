import useSWR from 'swr';
import Axios from 'axios';

export default function useProducts() {
  const { data, error } = useSWR(
    'http://localhost:3000/api/admin/products',
    (url) => Axios.get(url).then((res) => res.data),
  );

  const products = data?.map((product: any) => ({
    id: product._id,
    title: product.title,
    stock: product.stock,
    updatedAt: new Date(product.updatedAt).toDateString(),
  }));

  return {
    products,
    productsIsLoading: !error && !data,
    productsIsError: error,
  };
}
