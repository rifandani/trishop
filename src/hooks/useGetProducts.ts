import useSWR, { SWRConfiguration } from 'swr'
// files
import { APIResponseProducts, IProduct } from 'types/Product'

interface UseGetProductsReturn {
  products: IProduct[]
  productsIsLoading: boolean
  productsIsError: any
}

export default function useGetProducts(
  options?: SWRConfiguration
): UseGetProductsReturn {
  const { data, error } = useSWR<APIResponseProducts>(
    '/admin/products',
    options
  )

  return {
    products: data?.products,
    productsIsLoading: !error && !data,
    productsIsError: error,
  }
}
