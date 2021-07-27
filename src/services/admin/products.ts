import axios from 'axios'
// files
import { API_BASE_URL } from 'config/constants'
import {
  IProduct,
  APIResponseProducts,
  APIResponseProduct,
  IPostProductResponse,
  IAddAndEditProduct,
} from 'types/Product'

interface PostResponse {
  readonly status: number
  readonly data: IPostProductResponse
}

interface PutResponse {
  readonly status: number
  readonly data: Omit<IPostProductResponse, 'productId'>
}

// create axios instance
const adminProductsApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/products`,
})

export async function getAdminProducts(): Promise<IProduct[]> {
  const res = await adminProductsApi.get<APIResponseProducts>(``)
  return res.data.products
}

export async function postAdminProduct(
  productInput: IAddAndEditProduct
): Promise<PostResponse> {
  const res = await adminProductsApi.post<IPostProductResponse>(
    ``,
    productInput
  )

  return {
    status: res.status,
    data: res.data,
  }
}

export async function getAdminProduct(productId: string): Promise<IProduct> {
  const res = await adminProductsApi.get<APIResponseProduct>(`/${productId}`)
  return res.data.product
}

export async function putAdminProduct(
  productId: string,
  productInput: IAddAndEditProduct
): Promise<PutResponse> {
  const res = await adminProductsApi.put<IPostProductResponse>(
    `/${productId}`,
    productInput
  )

  return {
    status: res.status,
    data: res.data,
  }
}

export async function deleteAdminProduct(productId: string): Promise<void> {
  await adminProductsApi.delete(`/${productId}`)
}
