import { NextApiRequest, NextApiResponse } from 'next';
// files

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  // hilangin warning harus return promise
  return new Promise<void>(async (resolve, reject) => {
    // connect db
    await connectDB();

    if (req.method === 'POST') {
      // destructure request body form
      const { email, password } = req.body;

      try {
        // login SUCCESS -------------------------- as USER
        res.status(200).json({
          error: false,
          message: 'You are logged in',
        });
      } catch (err) {
        // error => salah masukin email
        res
          .status(400) // bad request == client error
          .json({
            error: true,
            message: 'Please, input valid email address.',
          });
        return reject();
      }
    } else {
      // error => invalid req method
      res.status(405).json({ error: true, message: 'Only support POST req' });
      return reject();
    }
  });
}
