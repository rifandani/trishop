import useSWR from 'swr'
// files
import { APIResponseCoupons } from 'types/Coupon'

export default function useGetCoupons() {
  const { data, error } = useSWR<APIResponseCoupons>('/admin/coupons')

  const coupons = data?.coupons?.map((coupon) => ({
    ...coupon,
    _id: coupon._id.toString(),
    createdAt: new Date(coupon.createdAt).toLocaleString(),
    updatedAt: new Date(coupon.updatedAt).toLocaleString(),
  }))

  return {
    coupons,
    couponsIsLoading: !error && !data,
    couponsIsError: error,
  }
}
