// files
import { HttpResponse } from 'types'
import { TAddProductSchema } from 'yup/schema'
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

export interface APIResponseProduct extends HttpResponse {
  readonly product: IProduct
}

export interface APIResponseProducts extends HttpResponse {
  readonly products: IProduct[]
  readonly count: number
}

export interface APIResponsePostProduct extends HttpResponse {
  readonly productId?: string
}

// import { Document, Model } from 'mongoose'
// export interface IProductDocument extends IProduct, Document {}
// export interface IProductModel extends Model<IProductDocument> {}
