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
  sold: number // new
  reviews?: IReview[] // new
  createdAt?: Date
  updatedAt?: Date
}

// import { Document, Model } from 'mongoose'
// export interface IProductDocument extends IProduct, Document {}
// export interface IProductModel extends Model<IProductDocument> {}
