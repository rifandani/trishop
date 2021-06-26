import axios from 'axios'
// files
import { APIResponseUsers, IUser } from 'types/User'

export default async function getUsersAsAdmin(): Promise<IUser[]> {
  const res = await axios.get<APIResponseUsers>('/admin/users')

  return res.data.users
}
