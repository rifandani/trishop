import axios from 'axios'
// files
import { APIResponseProducts, IProduct } from 'types/Product'

export async function getProductsAsAdmin(): Promise<IProduct[]> {
  const res = await axios.get<APIResponseProducts>('/admin/products')

  return res.data.products
}
