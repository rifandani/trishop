import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// files
import {
  APIResponseProduct,
  APIResponseProducts,
  IProduct,
} from 'types/Product'
import { API_URL_DEV, API_URL_PROD } from 'config/constants'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === 'development' ? API_URL_DEV : API_URL_PROD,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string>({
      query: () => '/admin/products',
      transformResponse: (rawResult: APIResponseProducts) => rawResult.products,
    }),
    getProduct: builder.query<IProduct, string>({
      query: (productId) => `/admin/products/${productId}`,
      transformResponse: (rawResult: APIResponseProduct) => rawResult.product,
    }),
  }),
})

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductQuery } = productsApi
