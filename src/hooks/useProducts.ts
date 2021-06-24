import useSWR from 'swr'
// files
import { APIResponseProducts, IProduct } from 'types/Product'

interface ReturnType {
  products: IProduct[]
  productsIsLoading: boolean
  productsIsError: any
}

export default function useProducts(): ReturnType {
  const { data, error } = useSWR<APIResponseProducts>('/admin/products')

  // const products = data?.products?.map((product) => ({
  //   ...product,
  //   createdAt: new Date(product.createdAt).toDateString(),
  //   updatedAt: new Date(product.updatedAt),
  // }))

  return {
    products: data?.products,
    productsIsLoading: !error && !data,
    productsIsError: error,
  }
}
