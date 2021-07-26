import axios from 'axios'
// files
import {
  IProduct,
  APIResponseProducts,
  APIResponseProduct,
} from 'types/Product'
import { API_BASE_URL } from 'config/constants'

// create axios instance
const adminProductsApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/products`,
})

export async function getAdminProducts(): Promise<IProduct[]> {
  const res = await adminProductsApi.get<APIResponseProducts>(``)
  return res.data.products
}

export async function getAdminProduct(productId: string): Promise<IProduct> {
  const res = await adminProductsApi.get<APIResponseProduct>(`/${productId}`)
  return res.data.product
}
