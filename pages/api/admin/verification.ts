import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
// files
import { mySecretKey } from '../../../utils/config';

export default function verification(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    verify(req.cookies.auth!, mySecretKey, async (err, decoded) => {
      // kalau cookies ada / match
      if (!err && decoded) {
        return res.status(200).json({
          isAdmin: true,
          message: 'You are authenticated',
          authCookies: req.cookies.auth,
          decoded,
        });
      }

      // kalau cookies tidak ada / tidak match === not authenticated
      res
        .status(401)
        .json({ isAdmin: false, message: 'You are not authenticated' });
    });
  } else {
    // error => invalid req method
    res.status(405).json({ error: true, message: 'Only support GET req' });
  }
}
