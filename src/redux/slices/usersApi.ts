import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// files
import { APIResponseUser, APIResponseUsers, IUser } from 'types/User'
import { API_URL_DEV, API_URL_PROD } from 'config/constants'

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === 'development' ? API_URL_DEV : API_URL_PROD,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], string>({
      query: () => '/admin/users',
      transformResponse: (rawResult: APIResponseUsers) => rawResult.users,
    }),
    getUser: builder.query<IUser, string>({
      query: (userId) => `/admin/users/${userId}`,
      transformResponse: (rawResult: APIResponseUser) => rawResult.user,
    }),
  }),
})

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetUsersQuery, useGetUserQuery } = usersApi
