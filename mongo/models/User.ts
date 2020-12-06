import mongoose from 'mongoose';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name must not be empty'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email must not be empty'],
      trim: true,
      unique: true,
      validate: {
        validator: (email: string) => emailRegex.test(email),
        message: (props: any) => `${props.value} is not a valid email`,
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
      enum: ['USER', 'ADMIN'],
      default: () => 'USER',
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
