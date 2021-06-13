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
  _id?: string
}

export interface IReviewProps {
  review: IReview
}

export interface IReviewsProps {
  reviews: IReview[]
}

/* ------------------------------ API response ------------------------------ */

export interface IGetReviewResponse {
  error: boolean
  review: IReview
  message?: string
}

export interface IGetReviewsResponse {
  error: boolean
  reviews: IReview[]
  count: number
  message?: string
}

export interface IPostReviewResponse {
  error: boolean
  reviewId: string
  message?: string
}

export interface IPutReviewResponse {
  error: boolean
  message: string
}

export interface IDeleteReviewResponse {
  error: boolean
  message: string
}

// import { Document, Model } from 'mongoose'
// export interface IReviewDocument extends IReview, Document {}
// export interface IReviewModel extends Model<IReviewDocument> {}
