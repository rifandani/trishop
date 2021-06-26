import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
// files
import { IProduct } from 'types/Product'
import getProductsAsAdmin from 'helpers/getProductsAsAdmin'

export default function useProductsAsAdmin<TData = IProduct[]>(
  options?: UseQueryOptions<IProduct[], AxiosError, TData>
): UseQueryResult<TData, AxiosError> {
  return useQuery('productsAsAdmin', getProductsAsAdmin, options)
}
