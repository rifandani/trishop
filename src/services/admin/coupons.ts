import { API_BASE_URL_ADMIN_COUPON } from 'config/constants.config'
import { httpDelete, httpGet, httpPost, httpPut } from 'services/http'
import {
  APIResponseCoupon,
  APIResponseCoupons,
  APIResponsePostCoupon,
  APIResponsePutCoupon,
  IAddAndEditCoupon,
  ICoupon,
} from 'types/Coupon'

interface PostResponse {
  readonly status: number
  readonly data: APIResponsePostCoupon
}
interface PutResponse {
  readonly status: number
  readonly data: APIResponsePutCoupon
}

export async function getAdminCoupons(): Promise<ICoupon[]> {
  const res = await httpGet<APIResponseCoupons>(API_BASE_URL_ADMIN_COUPON)
  return res.data.coupons
}

export async function postAdminCoupon(
  couponInput: IAddAndEditCoupon
): Promise<PostResponse> {
  const res = await httpPost<APIResponsePostCoupon>(
    API_BASE_URL_ADMIN_COUPON,
    couponInput
  )

  return {
    status: res.status,
    data: res.data,
  }
}

export async function getAdminCoupon(couponId: string): Promise<ICoupon> {
  const res = await httpGet<APIResponseCoupon>(
    `${API_BASE_URL_ADMIN_COUPON}/${couponId}`
  )
  return res.data.coupon
}

export async function putAdminCoupon(
  couponId: string,
  couponInput: IAddAndEditCoupon
): Promise<PutResponse> {
  const res = await httpPut<APIResponsePutCoupon>(
    `${API_BASE_URL_ADMIN_COUPON}/${couponId}`,
    couponInput
  )

  return {
    status: res.status,
    data: res.data,
  }
}

export async function deleteAdminCoupon(couponId: string): Promise<void> {
  await httpDelete(`${API_BASE_URL_ADMIN_COUPON}/${couponId}`)
}
