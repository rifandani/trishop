// files
import { IReview } from './Review'
import { TAddProductSchema } from 'yup/schema'

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
  _id?: string
  __v?: number
}

export interface IProductProps {
  product: IProduct
}

export interface IProductsProps {
  products: IProduct[]
}

export interface IAddAndEditProduct extends TAddProductSchema {
  images: TImage[]
}

/* --------------------------------- client --------------------------------- */

export interface APIResponseProduct {
  error: boolean
  product: IProduct
  message?: string
}

export interface APIResponseProducts {
  error: boolean
  products: IProduct[]
  count: number
  message?: string
}

export interface IPostProductResponse {
  readonly error?: boolean
  readonly productId?: string
  readonly message?: string
}

// import { Document, Model } from 'mongoose'
// export interface IProductDocument extends IProduct, Document {}
// export interface IProductModel extends Model<IProductDocument> {}
