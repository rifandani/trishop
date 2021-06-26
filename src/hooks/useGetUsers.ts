import useSWR, { SWRConfiguration } from 'swr'
// files
import { APIResponseUsers, IUser } from 'types/User'

interface ReturnType {
  users: IUser[]
  usersIsLoading: boolean
  usersIsError: any
}

export default function useGetUsers(options?: SWRConfiguration): ReturnType {
  const { data, error } = useSWR<APIResponseUsers>('/admin/users', options)

  return {
    users: data?.users,
    usersIsLoading: !error && !data,
    usersIsError: error,
  }
}
