import { API_BASE_URL_ADMIN_PRODUCT } from 'config/constants'
import { httpDelete, httpGet, httpPost, httpPut } from 'services/http'
import {
  APIResponseProduct,
  APIResponseProducts,
  IAddAndEditProduct,
  IPostProductResponse,
  IProduct,
} from 'types/Product'

interface PostResponse {
  readonly status: number
  readonly data: IPostProductResponse
}

interface PutResponse {
  readonly status: number
  readonly data: Omit<IPostProductResponse, 'productId'>
}

export async function getAdminProducts(): Promise<IProduct[]> {
  const res = await httpGet<APIResponseProducts>(API_BASE_URL_ADMIN_PRODUCT)
  return res.data.products
}

export async function postAdminProduct(
  productInput: IAddAndEditProduct
): Promise<PostResponse> {
  const res = await httpPost<IPostProductResponse>(
    API_BASE_URL_ADMIN_PRODUCT,
    productInput
  )

  return {
    status: res.status,
    data: res.data,
  }
}

export async function getAdminProduct(productId: string): Promise<IProduct> {
  const res = await httpGet<APIResponseProduct>(
    `${API_BASE_URL_ADMIN_PRODUCT}/${productId}`
  )
  return res.data.product
}

export async function putAdminProduct(
  productId: string,
  productInput: IAddAndEditProduct
): Promise<PutResponse> {
  const res = await httpPut<IPostProductResponse>(
    `${API_BASE_URL_ADMIN_PRODUCT}/${productId}`,
    productInput
  )

  return {
    status: res.status,
    data: res.data,
  }
}

export async function deleteAdminProduct(productId: string): Promise<void> {
  await httpDelete(`${API_BASE_URL_ADMIN_PRODUCT}/${productId}`)
}
