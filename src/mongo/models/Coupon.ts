import { Schema, model, models, Model } from 'mongoose'
// files
import { ICoupon } from 'types/Coupon'

const urlRegex =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

const couponSchema = new Schema<ICoupon>(
  {
    discount: {
      type: Number,
      required: [true, 'discount must not be empty'],
      min: 0,
    },
    minTransaction: {
      type: Number,
      required: [true, 'minTransaction must not be empty'],
      min: 0,
    },
    // fixed: E11000-duplicate-key-error-index-in-mongodb-mongoose
    usedBy: {
      type: [String],
      required: false,
      default: () => [],
      // index: true,
      // unique: true,
      // sparse: true,
    },
    code: {
      type: String,
      required: [true, 'code must not be empty'],
      trim: true,
      unique: [true, 'code must be unique'],
      minlength: 3,
    },
    desc: {
      type: String,
      required: [true, 'desc must not be empty'],
      minlength: 10,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'imageUrl must not be empty'],
      trim: true,
      validate: {
        validator: (url: string) => urlRegex.test(url),
        message: (props: any) => `${props.value} is not a valid URL`,
      },
    },
    validUntil: {
      type: Number,
      required: [true, 'validUntil must not be empty'],
    },
  },
  { timestamps: true }
)

const CouponModel = models.Coupon || model<ICoupon>('Coupon', couponSchema)

export default CouponModel as Model<ICoupon, {}, {}>
