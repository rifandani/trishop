import axios from 'axios'
// files
import { API_BASE_URL } from 'config/constants'
import {
  APIResponseCoupon,
  APIResponseCoupons,
  IAddAndEditCoupon,
  ICoupon,
  IPostCouponResponse,
} from 'types/Coupon'

interface PostResponse {
  readonly status: number
  readonly data: IPostCouponResponse
}

// create axios instance
const adminCouponsApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/coupons`,
})

export async function getAdminCoupons(): Promise<ICoupon[]> {
  const res = await adminCouponsApi.get<APIResponseCoupons>(``)
  return res.data.coupons
}

export async function postAdminCoupon(
  couponInput: IAddAndEditCoupon
): Promise<PostResponse> {
  const res = await adminCouponsApi.post<IPostCouponResponse>(``, couponInput)

  return {
    status: res.status,
    data: res.data,
  }
}

export async function getAdminCoupon(couponId: string): Promise<ICoupon> {
  const res = await adminCouponsApi.get<APIResponseCoupon>(`/${couponId}`)
  return res.data.coupon
}

export async function deleteAdminCoupon(couponId: string): Promise<void> {
  await adminCouponsApi.delete(`/${couponId}`)
}
