import useSWR from 'swr'
// files
import { IUser, APIResponseUsers } from 'types/User'

interface ReturnType {
  users: IUser[]
  usersIsLoading: boolean
  usersIsError: any
}

export default function useUsers(): ReturnType {
  const { data, error } = useSWR<APIResponseUsers>('/admin/users')

  // const users = data?.users?.map((user) => ({
  //   ...user,
  //   _id: user._id.toString(),
  //   createdAt: new Date(user.createdAt).toLocaleString(),
  //   updatedAt: new Date(user.updatedAt).toLocaleString(),
  // }))

  return {
    users: data?.users,
    usersIsLoading: !error && !data,
    usersIsError: error,
  }
}
