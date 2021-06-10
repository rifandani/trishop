import { Schema } from 'mongoose'

const product = {
  title: 'Xiaomi Redmi Note 4',
  price: 125000,
  stock: 12,
  desc: 'My first xiaomi phone',
  labels: ['electronics', 'smartphone'],
  images: [
    {
      imageName: 'product.png',
      imageUrl: 'images/product.png',
      publicId: 'asdih1824y675haasdasdd', // from cloudinary
      tags: ['chocolate', 'cream'], // from cloudinary
    },
  ],
  sold: 10,
  reviews: [Schema.Types.ObjectId], // review
  createdAt: '2020-11-06T09:21:15.364+00:00',
  updatedAt: '2020-11-06T09:21:15.364+00:00',
}

export default product
