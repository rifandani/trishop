import { Document, Model } from 'mongoose'

export interface ICoupon {
  discount: number
  minTransaction: number
  usedBy: string[]
  code: string
  desc: string
  imageUrl: string
  validUntil: number
  createdAt?: Date
  updatedAt?: Date
}

export type Coupons = ICoupon[]
export interface ICouponDocument extends ICoupon, Document {}
export interface ICouponModel extends Model<ICouponDocument> {}
