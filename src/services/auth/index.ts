import axios from 'axios'
// files
import { API_BASE_URL } from 'config/constants'
import { APIResponseAuthLoginRegister } from 'types/User'
import { TLoginApiSchema, TRegisterApiSchema } from 'yup/apiSchema'

interface AuthResponse {
  status: number
  data: APIResponseAuthLoginRegister
}

// create axios instance
export const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
})

export async function login(
  loginInput: TLoginApiSchema
): Promise<AuthResponse> {
  const res = await authApi.post<APIResponseAuthLoginRegister>(
    `/login`,
    loginInput
  )

  return {
    status: res.status,
    data: res.data,
  }
}

export async function register(
  registerInput: TRegisterApiSchema
): Promise<AuthResponse> {
  const res = await authApi.post<APIResponseAuthLoginRegister>(
    `/register`,
    registerInput
  )

  return {
    status: res.status,
    data: res.data,
  }
}

export async function logout(): Promise<void> {
  await authApi.get(`/logout`)
}
