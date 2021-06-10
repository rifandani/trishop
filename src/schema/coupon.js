import user from './user'

const coupon = {
  discount: 0.1, // percentage atau diskon Rp 15.000
  minTransaction: 100000,
  code: '10OFF',
  desc: 'kupon khusus untuk pelanggan setia dengan minimal pembelian sebelumnya sebanyak 5x',
  validUntil: 1234567890123, // milliseconds
  usedBy: [user._id, user._id], // string
  createdAt: '2020-11-06T09:21:15.364+00:00',
  updatedAt: '2020-11-06T09:21:15.364+00:00',
}

export default coupon
