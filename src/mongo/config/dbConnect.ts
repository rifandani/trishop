import { connect } from 'mongoose'

const MONGODB_URI = process.env.MONGO_HOST!

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

// declare global {
//   namespace NodeJS {
//     interface Global {
//       mongoose: Mongoose
//     }
//   }
// }
// export interface Global extends NodeJS.Global {
//   mongoose: Mongoose
// }
// declare const global: Global

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      // bufferCommands: false,
      // bufferMaxEntries: 0,
    }

    cached.promise = connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
