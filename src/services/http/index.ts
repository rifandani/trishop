import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL_DEV, API_URL_PROD } from 'config/constants'
import qs from 'qs'
import { toast } from 'react-toastify'

const axiosInstance = Axios

// axios default baseUrl for default SWR url
axiosInstance.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? API_URL_DEV : API_URL_PROD

// axios default validateStatus
axiosInstance.defaults.validateStatus = (status) =>
  (status >= 200 && status < 300) || (status >= 400 && status < 500)

// axios interceptors when there is error
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      // surpassed rate limit or client number of requests
      toast.error(error.message)
    } else if (error.response?.status === 401) {
      // unauthorized -> token is not valid or token is expired
      toast.error(error.message)

      // TODO: re-login using refresh token
    }

    return Promise.reject(error)
  }
)

export function httpGet<T = any, R = AxiosResponse<T>, D = any>(
  apiUri: string,
  config?: AxiosRequestConfig<D>,
  qsObject?: unknown
): Promise<R> {
  return axiosInstance.get(
    `${apiUri}${qsObject ? '?' + qs.stringify(qsObject) : ''}`,
    config
  )
}

export function httpPost<T = any, R = AxiosResponse<T>, D = any>(
  apiUri: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<R> {
  return axiosInstance.post(apiUri, data, config)
}

export function httpPatch<T = any, R = AxiosResponse<T>, D = any>(
  apiUri: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<R> {
  return axiosInstance.patch(apiUri, data, config)
}

export function httpPut<T = any, R = AxiosResponse<T>, D = any>(
  apiUri: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<R> {
  return axiosInstance.put(apiUri, data, config)
}

export function httpDelete<T = any, R = AxiosResponse<T>, D = any>(
  apiUri: string,
  config?: AxiosRequestConfig<D>
): Promise<R> {
  return axiosInstance.delete(apiUri, config)
}
