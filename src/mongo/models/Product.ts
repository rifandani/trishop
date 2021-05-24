import { Schema, model, models, Model } from 'mongoose';
// files
import { IProduct } from 'types/Product';

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 1,
    },
    desc: {
      type: String,
      trim: true,
      required: true,
      minlength: 10,
    },
    labels: {
      type: [String],
      required: true,
    },
    // categories: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category',
    //   },
    // ],
    images: {
      type: [],
      required: true,
      imageName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

const Product = models.Product || model<IProduct>('Product', productSchema);

export default Product as Model<IProduct, {}, {}>;
