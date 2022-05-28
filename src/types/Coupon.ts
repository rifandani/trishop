import { HttpResponse } from 'types'

export interface ICouponCode {
  _id: string
  code: string
}

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

export interface APIResponseCoupons extends HttpResponse {
  readonly coupons: ICoupon[]
  readonly count: number
}

export interface APIResponseCoupon extends HttpResponse {
  readonly coupon: ICoupon
}

export interface APIResponsePostCoupon extends HttpResponse {
  readonly couponId?: string
}

// import { Document, Model } from 'mongoose'
// export interface ICouponDocument extends ICoupon, Document {}
// export interface ICouponModel extends Model<ICouponDocument> {}
