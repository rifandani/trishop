import { Document, Model } from 'mongoose'
// files
import { IProduct } from './Product'

export type TImage = {
  imageName: string
  imageUrl: string
  publicId: string
  tags?: string[]
}

export interface IReview {
  productRef: string | IProduct
  reviewerId: string
  reviewerName: string
  comment: string
  star: number
  // reviewerImage?: TImage
  createdAt?: Date
  updatedAt?: Date
}

export interface IProductDocument extends IReview, Document {}
export interface IProductModel extends Model<IProductDocument> {}
