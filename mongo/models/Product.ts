import { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
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

const Product = models.Product || model('Product', productSchema);

export default Product;
