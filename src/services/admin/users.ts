import axios from 'axios'
// files
import { API_BASE_URL } from 'config/constants'
import { IUser, APIResponseUsers, APIResponseUser } from 'types/User'

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

export async function deleteAdminUser(userId: string): Promise<void> {
  await adminUsersApi.delete(`/${userId}`)
}
