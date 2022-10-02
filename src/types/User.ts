import { UserPayload } from 'contexts/UserReducer'
import { HttpResponse } from 'types'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  email: string
  name: string
  password: string
  role: UserRole
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

export interface IAddAndEditUser {
  name: string
  email: string
  password: string
  role: UserRole
}

/* ------------------------------ API Response ------------------------------ */

export interface APIResponseAuthLoginRegister extends HttpResponse {
  readonly data?: UserPayload
}

export interface APIResponseUser extends HttpResponse {
  readonly user: IUser
}

export interface APIResponseUsers extends HttpResponse {
  readonly users: IUser[]
  readonly count: number
}

export interface APIResponsePostUser extends HttpResponse {
  readonly userId: string
}

export type APIResponsePutUser = HttpResponse

// import { Document, Model } from 'mongoose'
// export interface IUserDocument extends IUser, Document {}
// export interface IUserModel extends Model<IUserDocument> {}
