import useSWR from 'swr'
// files
import { ICoupon, APIResponseCoupons } from 'types/Coupon'

interface UseGetCouponsReturn {
  coupons: ICoupon[]
  couponsIsLoading: boolean
  couponsIsError: any
}

export default function useGetCoupons(): UseGetCouponsReturn {
  const { data, error } = useSWR<APIResponseCoupons>('/admin/coupons')

  return {
    coupons: data?.coupons,
    couponsIsLoading: !error && !data,
    couponsIsError: error,
  }
}
