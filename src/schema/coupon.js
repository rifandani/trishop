import user from './user'

const coupon = {
  discount: 0.1, // percentage atau diskon Rp 15.000
  minTransaction: 100000,
  usedBy: [user._id, user._id],
  code: '10OFF',
  desc: 'kupon khusus untuk pelanggan setia dengan minimal pembelian sebelumnya sebanyak 5x',
  imageUrl:
    'https://firebasestorage.googleapis.com/v0/b/roompy-roompies.appspot.com/o/promotion%2F1024x600.jpg?alt=media&token=3c7e16de-030e-4cea-abbb-3b85902a065a',
  validUntil: '2020-11-06T09:21:15.364+00:00',
  createdAt: '2020-11-06T09:21:15.364+00:00',
  updatedAt: '2020-11-06T09:21:15.364+00:00',
}

export default coupon
