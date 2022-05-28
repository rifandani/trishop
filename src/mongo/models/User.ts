import { Model, model, models, Schema } from 'mongoose'
import { IUser, UserRole } from 'types/User'
import { string } from 'yup'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name must not be empty'],
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email must not be empty'],
      trim: true,
      unique: true,
      validate: {
        validator: (email: string): boolean =>
          string().email().isValidSync(email),
        message: (props: any): string => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password must not be empty'],
    },
    role: {
      type: String,
      required: true,
      enum: [UserRole.USER, UserRole.ADMIN],
      default: UserRole.USER,
    },
  },
  { timestamps: true }
)

// Document middlewares
// UserSchema.pre('save', (doc: IUserDocument) => {
//   if (doc.isModified('password')) {
//     // hash password with bcrypt
//     const hash = hashSync(doc.password, 10);
//     doc.password = hash;
//   }
// });

const UserModel = models.User || model<IUser>('User', userSchema)

export default UserModel as Model<
  IUser,
  Record<string, unknown>,
  Record<string, unknown>
>

/* -------------------------------------------------------------------------- */
/*                               second version                               */
/* -------------------------------------------------------------------------- */

// import { Schema, model, models } from 'mongoose';
// import { IUserDocument, IUserModel } from 'types/User';

// const UserSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name must not be empty'],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, 'Email must not be empty'],
//       trim: true,
//       unique: true,
//       validate: {
//         validator: (email: string) => emailRegex.test(email),
//         message: (props: any) => `${props.value} is not a valid email`,
//       },
//     },
//     password: {
//       type: String,
//       trim: true,
//       required: [true, 'Password must not be empty'],
//     },
//     role: {
//       type: String,
//       required: true,
//       enum: ['USER', 'ADMIN'],
//       default: () => 'USER',
//     },
//   },
//   { timestamps: true },
// );

// const UserModel =
//   models.User || model<IUserDocument, IUserModel>('User', UserSchema);

// export default UserModel as IUserModel;
