import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title must not be empty'],
      trim: true,
      minlength: 3,
    },
    stock: {
      type: Number,
      required: [true, 'Stock must not be empty'],
      min: 1,
    },
    desc: {
      type: String,
      trim: true,
      required: [true, 'Description must not be empty'],
      minlength: 10,
    },
    labels: {
      type: [String],
      required: [true, 'Labels must not be empty'],
    },
    images: {
      type: [],
      required: [true, 'Images must not be empty'],
      imageName: {
        type: String,
        required: [true, 'ImageName must not be empty'],
        trim: true,
        minlength: 3,
        unique: true,
      },
      imageUrl: {
        type: String,
        required: [true, 'ImageUrl must not be empty'],
      },
    },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
