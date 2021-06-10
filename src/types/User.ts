export interface IUser {
  email: string
  name: string
  password: string
  role: TRole
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserProps {
  user: IUser
}

export type TRole = 'ADMIN' | 'USER'

// import { Document, Model } from 'mongoose'
// export interface IUserDocument extends IUser, Document {}
// export interface IUserModel extends Model<IUserDocument> {}
