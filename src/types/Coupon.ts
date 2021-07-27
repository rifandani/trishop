export interface ICoupon {
  discount: number
  minTransaction: number
  usedBy: string[]
  code: string
  desc: string
  validUntil: number
  createdAt?: Date
  updatedAt?: Date
  _id?: string
  __v?: number
}

export interface ICouponProps {
  coupon: ICoupon
}

export interface ICouponsProps {
  coupons: ICoupon[]
}

export interface IAddAndEditCoupon {
  code: string
  discount: number
  minTransaction: number
  desc: string
  validUntil: number
}

/* ---------------------------------------- API response ---------------------------------------- */

export interface APIResponseCoupons {
  error: boolean
  coupons: ICoupon[]
  count: number
  message?: string
}

export interface APIResponseCoupon {
  error: boolean
  coupon: ICoupon
  message?: string
}

export interface IPostCouponResponse {
  readonly error?: boolean
  readonly couponId?: string
  readonly message?: string
}

// import { Document, Model } from 'mongoose'
// export interface ICouponDocument extends ICoupon, Document {}
// export interface ICouponModel extends Model<ICouponDocument> {}
