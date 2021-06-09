import { Schema, model, models, Model } from 'mongoose'
// files
import { IProduct } from 'types/Product'

const urlRegex =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, 'title must not be empty'],
      minlength: 3,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'price must not be empty'],
      min: 1,
    },
    stock: {
      type: Number,
      required: [true, 'stock must not be empty'],
      min: 1,
    },
    sold: {
      type: Number,
      default: () => 0,
      min: 0,
    },
    desc: {
      type: String,
      required: [true, 'desc must not be empty'],
      minlength: 10,
      trim: true,
    },
    labels: {
      type: [String],
      required: [true, 'labels must not be empty'],
      trim: true,
    },
    images: {
      type: [],
      required: [true, 'images must not be empty'],
      imageName: {
        type: String,
        required: [true, 'imageName must not be empty'],
        trim: true,
        minlength: 3,
        unique: [true, 'imageName must be unique'],
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
      publicId: {
        type: String,
        required: [true, 'publicId must not be empty'],
        trim: true,
      },
      tags: {
        type: [String],
        trim: true,
      },
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    // it is usually bad MongoDB schema design to include arrays that grow without bound in your documents.
    // Do not include a constantly-growing array of ObjectIds in your schema - your data will become unwieldy as the array grows and you will eventually hit the 16 MB document size limit.

    // embedded documents - style
    // nanti ada _id nya juga
    // reviews: {
    //   type: [],
    //   ref: reviewSchema
    // },
  },
  { timestamps: true }
)

const ProductModel = models.Product || model<IProduct>('Product', productSchema)

export default ProductModel as Model<IProduct, {}, {}>
