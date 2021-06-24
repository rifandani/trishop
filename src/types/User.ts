import { UserPayload } from 'contexts/UserReducer'

export interface IUser {
  email: string
  name: string
  password: string
  role: 'ADMIN' | 'USER'
  createdAt?: Date
  updatedAt?: Date
  _id?: string
  __v?: number
}

export interface IUserProps {
  user: IUser
}

export interface IUsersProps {
  users: IUser[]
}

/* ------------------------------ API Response ------------------------------ */

export interface APIResponseAuthLoginRegister {
  error: boolean
  message: string
  data?: UserPayload
}

export interface APIResponseUser {
  error: boolean
  user: IUser
}

export interface APIResponseUsers {
  error: boolean
  users: IUser[]
  count: number
}

// import { Document, Model } from 'mongoose'
// export interface IUserDocument extends IUser, Document {}
// export interface IUserModel extends Model<IUserDocument> {}
