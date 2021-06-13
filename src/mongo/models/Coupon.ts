import { Schema, model, models, Model } from 'mongoose'
// files
import { ICoupon } from 'types/Coupon'

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
    code: {
      type: String,
      required: [true, 'code must not be empty'],
      unique: [true, 'code must be unique'],
      trim: true,
      minlength: 3,
    },
    desc: {
      type: String,
      required: [true, 'desc must not be empty'],
      trim: true,
      minlength: 10,
    },
    validUntil: {
      type: Number,
      required: [true, 'validUntil must not be empty'],
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
  },
  { timestamps: true }
)

const CouponModel = models.Coupon || model<ICoupon>('Coupon', couponSchema)

export default CouponModel as Model<
  ICoupon,
  Record<string, unknown>,
  Record<string, unknown>
>
