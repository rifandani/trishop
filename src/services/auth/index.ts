import { API_BASE_URL_AUTH } from 'config/constants'
import { httpGet, httpPost } from 'services/http'
import { APIResponseAuthLoginRegister } from 'types/User'
import { TLoginApiSchema, TRegisterApiSchema } from 'yup/apiSchema'

interface AuthResponse {
  status: number
  data: APIResponseAuthLoginRegister
}

export async function login(
  loginInput: TLoginApiSchema
): Promise<AuthResponse> {
  const res = await httpPost<APIResponseAuthLoginRegister>(
    `${API_BASE_URL_AUTH}/login`,
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
  const res = await httpPost<APIResponseAuthLoginRegister>(
    `${API_BASE_URL_AUTH}/register`,
    registerInput
  )

  return {
    status: res.status,
    data: res.data,
  }
}

export async function logout(): Promise<void> {
  await httpGet(`${API_BASE_URL_AUTH}/logout`)
}
