import { Schema, model, models } from 'mongoose';

const categorySchema = new Schema({
  names: [
    {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  ],
  productDetail: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
});

const Category = models.Category || model('Category', categorySchema);

export default Category;
