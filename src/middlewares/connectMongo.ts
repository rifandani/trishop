import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
// files
import MongoConfig from 'mongo/config/MongoConfig';

// connect mongodb middleware
const connectMongo =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await MongoConfig.connectDB();

      // next()
      await fn(req, res);
    } catch (err) {
      // mongo connection error
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message });
      return;
    } finally {
      await MongoConfig.disconnectDB();
    }
  };

export default connectMongo;
