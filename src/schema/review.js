import user from './user'

const review = {
  reviewer: user,
  desc: 'Produk ini sangat bagus dan awet. Merchant sangat dapat dipercaya.',
  stars: 5,
  likes: 4,
  likedBy: [user._id, user._id],
  createdAt: '2020-11-06T09:21:15.364+00:00',
  updatedAt: '2020-11-06T09:21:15.364+00:00',
}

export default review
