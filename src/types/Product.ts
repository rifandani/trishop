import { Document, Model } from 'mongoose'

export type TImage = {
  imageName: string
  imageUrl: string
}

export interface IProduct {
  createdAt?: number
  desc: string
  images: TImage[]
  labels: string[]
  price: number
  stock: number
  title: string
  updatedAt?: number
}

export type Products = IProduct[]
export interface IProductDocument extends IProduct, Document {}
export interface IProductModel extends Model<IProductDocument> {}
