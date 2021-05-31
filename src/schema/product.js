import review from './review'

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
    },
  ],
  createdAt: '2020-11-06T09:21:15.364+00:00',
  updatedAt: '2020-11-06T09:21:15.364+00:00',
  sold: 10,
  // TODO: reviews
  reviews: [review, review],
}

export default product
