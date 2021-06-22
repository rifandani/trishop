import useSWR from 'swr'
// files
import { ICoupon, APIResponseCoupons } from 'types/Coupon'

interface ReturnType {
  coupons: ICoupon[]
  couponsIsLoading: boolean
  couponsIsError: any
}

export default function useGetCoupons(): ReturnType {
  const { data, error } = useSWR<APIResponseCoupons>('/admin/coupons')

  // const coupons = data?.coupons?.map((coupon) => ({
  //   ...coupon,
  //   _id: coupon._id.toString(),
  //   createdAt: new Date(coupon.createdAt).toLocaleString(),
  //   updatedAt: new Date(coupon.updatedAt).toLocaleString(),
  // }))

  return {
    coupons: data?.coupons,
    couponsIsLoading: !error && !data,
    couponsIsError: error,
  }
}
