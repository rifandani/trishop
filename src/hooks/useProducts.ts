import useSWR from 'swr'
// files
import { APIResponseProducts } from 'components/products/ProductsComp'

export default function useProducts() {
  const { data, error } = useSWR<APIResponseProducts>('/admin/products')

  const products = data?.products?.map((product) => ({
    ...product,
    createdAt: new Date(product.createdAt).toDateString(),
    updatedAt: new Date(product.updatedAt).toDateString(),
  }))

  return {
    products,
    productsIsLoading: !error && !data,
    productsIsError: error,
  }
}
