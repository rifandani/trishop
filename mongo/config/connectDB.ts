import mongoose from 'mongoose';

export default function connectDB() {
  return mongoose.connect(
    'mongodb+srv://rifandani:rifandani@cluster0.ksbnd.mongodb.net/trishop',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  );
}
