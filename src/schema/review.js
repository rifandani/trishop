import { Schema } from 'mongoose'
import user from './user'

const review = {
  productRef: Schema.Types.ObjectId,
  reviewerId: user._id,
  reviewerName: 'rifandani',
  comment: 'Produk ini sangat bagus dan awet. Merchant sangat dapat dipercaya.',
  star: 5,
  likes: [user._id, user._id], // coming soon
  createdAt: '2020-11-06T09:21:15.364+00:00',
  updatedAt: '2020-11-06T09:21:15.364+00:00',
}

export default review
