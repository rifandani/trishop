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

interface ReturnType {
  users: {
    _id: string
    createdAt: string
    updatedAt: string
    email: string
    name: string
    password: string
    role: 'ADMIN' | 'USER'
  }[]
  usersIsLoading: boolean
  usersIsError: any
}

export default function useUsers(): ReturnType {
  const { data, error } = useSWR<APIResponseUsers>('/admin/users')

  const users = data?.users?.map((user) => ({
    ...user,
    _id: user._id.toString(),
    createdAt: new Date(user.createdAt).toLocaleString(),
    updatedAt: new Date(user.updatedAt).toLocaleString(),
  }))

  return {
    users,
    usersIsLoading: !error && !data,
    usersIsError: error,
  }
}
