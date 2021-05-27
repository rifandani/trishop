import { Schema, model, models, Model } from 'mongoose'
// files
import { IProduct } from 'types/Product'

const urlRegex =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, 'Title must not be empty'],
      minlength: 3,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price must not be empty'],
      min: 1,
    },
    stock: {
      type: Number,
      required: [true, 'Stock must not be empty'],
      min: 1,
    },
    desc: {
      type: String,
      required: [true, 'Description must not be empty'],
      minlength: 10,
      trim: true,
    },
    labels: {
      type: [String],
      required: [true, 'Labels must not be empty'],
      trim: true,
    },
    // categories: [
    //   { sebagai contoh saja kalau pakai relationship
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category',
    //   },
    // ],
    images: {
      type: [],
      required: [true, 'Images must not be empty'],
      imageName: {
        type: String,
        required: [true, 'Image name must not be empty'],
        trim: true,
        minlength: 3,
        unique: [true, 'Image name must be unique'],
      },
      imageUrl: {
        type: String,
        required: [true, 'Image url must not be empty'],
        trim: true,
        unique: [true, 'Image url must be unique'],
        validate: {
          validator: (url: string) => urlRegex.test(url),
          message: (props: any) => `${props.value} is not a valid URL`,
        },
      },
    },
  },
  { timestamps: true }
)

const ProductModel = models.Product || model<IProduct>('Product', productSchema)

export default ProductModel as Model<IProduct, {}, {}>
