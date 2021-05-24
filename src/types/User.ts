import { Document, Model } from 'mongoose';

export interface IUser {
  createdAt?: number;
  email: string;
  name: string;
  password: string;
  role: TRole;
  updatedAt?: number;
}

export type TRole = 'ADMIN' | 'USER';
export type Users = IUser[];
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
