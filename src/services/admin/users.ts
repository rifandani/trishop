import axios from 'axios'
// files
import { IUser, APIResponseUsers, APIResponseUser } from 'types/User'
import { API_BASE_URL } from 'config/constants'

// create axios instance
export const adminUsersApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/users`,
})

export async function getAdminUsers(): Promise<IUser[]> {
  const res = await adminUsersApi.get<APIResponseUsers>(``)
  return res.data.users
}

export async function getAdminUser(userId: string): Promise<IUser> {
  const res = await adminUsersApi.get<APIResponseUser>(`/${userId}`)
  return res.data.user
}
