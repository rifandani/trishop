import { API_BASE_URL_ADMIN_USER } from 'config/constants.config'
import { httpDelete, httpGet, httpPost, httpPut } from 'services/http'
import {
  APIResponsePostUser,
  APIResponsePutUser,
  APIResponseUser,
  APIResponseUsers,
  IAddAndEditUser,
  IUser,
} from 'types/User'

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

export async function postAdminUser(
  userInput: IAddAndEditUser
): Promise<APIResponsePostUser> {
  const res = await httpPost<APIResponsePostUser>(
    API_BASE_URL_ADMIN_USER,
    userInput
  )

  return res.data
}

export async function putAdminUser(
  userId: string,
  userInput: IAddAndEditUser
): Promise<APIResponsePutUser> {
  const res = await httpPut<APIResponsePutUser>(
    `${API_BASE_URL_ADMIN_USER}/${userId}`,
    userInput
  )

  return res.data
}

export async function deleteAdminUser(userId: string): Promise<void> {
  await httpDelete(`${API_BASE_URL_ADMIN_USER}/${userId}`)
}
