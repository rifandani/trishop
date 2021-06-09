import { Document, Model } from 'mongoose'
// files
import { IReview } from './Review'

export type TImage = {
  imageName: string
  imageUrl: string
  publicId: string
  tags?: string[]
}

export interface IProduct {
  desc: string
  images: TImage[]
  labels: string[]
  price: number
  stock: number
  title: string
  sold: number
  reviews?: IReview[]
  createdAt?: Date
  updatedAt?: Date
}

export interface IProductDocument extends IProduct, Document {}
export interface IProductModel extends Model<IProductDocument> {}
