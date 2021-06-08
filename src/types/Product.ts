import { Document, Model } from 'mongoose'

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
  createdAt?: Date
  updatedAt?: Date
}

export type Products = IProduct[]
export interface IProductDocument extends IProduct, Document {}
export interface IProductModel extends Model<IProductDocument> {}
