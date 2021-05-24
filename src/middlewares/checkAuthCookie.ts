import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

// next API middleware
const checkAuthCookie =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(
      req.cookies.auth!,
      process.env.MY_SECRET_KEY,
      async (err, decoded) => {
        if (!err && decoded) {
          // next()
          return await fn(req, res);
        }

        // if not authenticated
        res.status(401).json({ message: 'You are Not Authenticated' });
      },
    );
  };

export default checkAuthCookie;
