import { connect, disconnect } from 'mongoose';

class MongoConfig {
  static connectDB() {
    return connect(process.env.MONGO_HOST!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      // useFindAndModify: false,
    });
  }

  static disconnectDB() {
    return disconnect();
  }
}

export default MongoConfig;
