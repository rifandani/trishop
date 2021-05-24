import useSWR from 'swr';

export default function useProducts() {
  const { data, error } = useSWR('/admin/products');

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
