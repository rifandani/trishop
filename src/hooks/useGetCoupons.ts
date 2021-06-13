import useSWR from 'swr'
// files
import { APIResponseCoupons } from 'types/Coupon'

interface ReturnType {
  coupons: {
    _id: string
    createdAt: string
    updatedAt: string // files
    discount: number
    minTransaction: number
    usedBy: string[]
    code: string
    desc: string
    validUntil: number
  }[]
  couponsIsLoading: boolean
  couponsIsError: any
}

export default function useGetCoupons(): ReturnType {
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
