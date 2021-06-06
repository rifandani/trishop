import useSWR from 'swr'
// files
import { IUser } from 'types/User'

interface User extends IUser {
  _id?: string
}

interface APIResponseUsers {
  error: boolean
  users: User[]
  count: number
}

export default function useUsers() {
  const { data, error } = useSWR<APIResponseUsers>('/admin/users')

  const users = data?.users?.map((user) => ({
    ...user,
    _id: user._id.toString(),
    createdAt: new Date(user.createdAt).toDateString(),
    updatedAt: new Date(user.updatedAt).toDateString(),
  }))

  return {
    users,
    usersIsLoading: !error && !data,
    usersIsError: error,
  }
}
