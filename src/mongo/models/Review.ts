import { Schema, model, models, Model } from 'mongoose'
// files
import { IReview } from 'types/Review'

// const urlRegex =
//   /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

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
    // reviewerImage: {
    //   imageName: {
    //     type: String,
    //     required: [true, 'imageName must not be empty'],
    //     trim: true,
    //     minlength: 3,
    //     unique: [true, 'imageName must be unique'],
    //   },
    //   imageUrl: {
    //     type: String,
    //     required: [true, 'imageUrl must not be empty'],
    //     trim: true,
    //     unique: [true, 'imageUrl must be unique'],
    //     validate: {
    //       validator: (url: string) => urlRegex.test(url),
    //       message: (props: any) => `${props.value} is not a valid URL`,
    //     },
    //   },
    //   publicId: {
    //     type: String,
    //     required: [true, 'publicId must not be empty'],
    //     trim: true,
    //   },
    //   tags: {
    //     type: [String],
    //     trim: true,
    //   },
    // },
  },
  { timestamps: true }
)

const ReviewModel = models.Review || model<IReview>('Review', reviewSchema)

export default ReviewModel as Model<IReview, {}, {}>
