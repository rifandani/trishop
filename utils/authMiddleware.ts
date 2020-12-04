import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
// files
import { mySecretKey } from './config';

// next API middleware
export const authMiddleware = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  verify(req.cookies.auth!, mySecretKey, async (err, decoded) => {
    if (!err && decoded) {
      // next()
      return await fn(req, res);
    }

    // if not authenticated
    res.status(401).json({ message: 'You are Not Authenticated' });
  });
};
