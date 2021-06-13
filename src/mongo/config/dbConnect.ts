import { connect } from 'mongoose'

const MONGO_HOST = process.env.MONGO_HOST

if (!MONGO_HOST) {
  throw new Error(
    'Please define the MONGO_HOST environment variable inside .env.local'
  )
}

async function dbConnect(): Promise<typeof import('mongoose')> {
  const conn = await connect(MONGO_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    // bufferCommands: false,
    // bufferMaxEntries: 0,
  })

  return conn
}

export default dbConnect
