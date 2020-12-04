import { NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';
// files
import { mySecretKey } from './config';

interface Payload {
  // subject
  // whom the token refers to
  sub: string;
}

export default function setCookie(payload: Payload, res: NextApiResponse) {
  // sign JWT token
  // const payload = {
  // sub: user._id, // reserved word sub == subject
  // userEmail: user.email,
  // iat: Math.floor(Date.now() / 1000), // reserved word iat == issuedAt
  // };

  const jwt = sign(payload, mySecretKey, { expiresIn: '3h' });

  // set cookie to response header
  res.setHeader(
    'Set-Cookie',
    // seperti JSON.stringify untuk cookies
    cookie.serialize('auth', jwt, {
      httpOnly: true, // javscript can't access our cookies
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 3, // 3 hour
      path: '/', // make it available everywhere, not only in /api
    }),
  );
}
