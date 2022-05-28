import { API_BASE_URL_ADMIN_USER } from 'config/constants'
import { httpDelete, httpGet } from 'services/http'
import { APIResponseUser, APIResponseUsers, IUser } from 'types/User'

export async function getAdminUsers(): Promise<IUser[]> {
  const res = await httpGet<APIResponseUsers>(API_BASE_URL_ADMIN_USER)
  return res.data.users
}

export async function getAdminUser(userId: string): Promise<IUser> {
  const res = await httpGet<APIResponseUser>(
    `${API_BASE_URL_ADMIN_USER}/${userId}`
  )
  return res.data.user
}

export async function deleteAdminUser(userId: string): Promise<void> {
  await httpDelete(`${API_BASE_URL_ADMIN_USER}/${userId}`)
}
