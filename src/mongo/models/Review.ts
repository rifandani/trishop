import { Schema, model, models, Model } from 'mongoose'
// files
import { IReview } from 'types/Review'

const reviewSchema = new Schema<IReview>(
  {
    productRef: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'productId must not be empty'],
    },
    reviewerId: {
      type: String,
      required: [true, 'reviewerId must not be empty'],
      trim: true,
    },
    reviewerName: {
      type: String,
      required: [true, 'reviewerName must not be empty'],
      minlength: 3,
      trim: true,
    },
    comment: {
      type: String,
      required: [true, 'comment must not be empty'],
      minlength: 5,
      trim: true,
    },
    star: {
      type: Number,
      required: [true, 'star must not be empty'],
      min: 1,
    },
  },
  { timestamps: true }
)

const ReviewModel = models.Review || model<IReview>('Review', reviewSchema)

export default ReviewModel as Model<
  IReview,
  Record<string, unknown>,
  Record<string, unknown>
>
