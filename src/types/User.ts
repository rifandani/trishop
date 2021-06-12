import { UserPayload } from 'contexts/UserReducer'

export interface IUser {
  email: string
  name: string
  password: string
  role: 'ADMIN' | 'USER'
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserProps {
  user: IUser
}

export interface IUsersProps {
  users: IUser[]
}

/* ------------------------------ API Response ------------------------------ */

export interface IAuthLoginRegister {
  error: boolean
  message: string
  data?: UserPayload
}

// import { Document, Model } from 'mongoose'
// export interface IUserDocument extends IUser, Document {}
// export interface IUserModel extends Model<IUserDocument> {}
