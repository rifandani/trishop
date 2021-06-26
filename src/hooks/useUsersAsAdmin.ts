import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
// files
import { IUser } from 'types/User'
import getUsersAsAdmin from 'helpers/getUsersAsAdmin'

export default function useUsersAsAdmin<TData = IUser[]>(
  options?: UseQueryOptions<IUser[], AxiosError, TData>
): UseQueryResult<TData, AxiosError> {
  return useQuery('usersAsAdmin', getUsersAsAdmin, options)
}
