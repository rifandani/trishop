import { Schema } from 'mongoose'

const user = {
  name: 'rifandani',
  email: 'rifandani@gmail.com',
  password: '$2b$10$2lk/vNyRaFaholLrM2hfS.LVcVaWb8xaQ1JG7kxFLQl5teuZUx3X2',
  role: 'ADMIN',
  orders: [Schema.Types.ObjectId], // coming soon
  createdAt: '2020-11-06T09:21:15.364+00:00',
  updatedAt: '2020-11-06T09:21:15.364+00:00',
}

export default user
