import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // hilangin warning harus return promise
  return new Promise<void>(async (resolve) => {
    if (req.method === 'POST') {
      // destructure request body form
      const { email, subject, message } = req.body;

      // check klo field form kosong
      if (!subject || !email || !message) {
        // error => name, email, password kosong
        res.status(400).json({
          error: true,
          message:
            'Please input the required subject, email and message field.',
        });
        return resolve();
      }

      // create transport
      const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: 'tri.rifandani@gmail.com',
          pass: 'rifandani098765Aa@',
        },
      });

      // mail options
      const mailOptions = {
        from: email,
        to: 'tri.rifandani@gmail.com',
        subject: `TriShop Contact - ${subject}`,
        text: `Email from: ${email}. Message: ${message}`,
      };

      // send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);

          // ERROR
          res.status(400).json({
            error: true,
            message: 'Send email error. Please, input a valid email.',
          });
          return resolve();
        } else {
          console.log('Email sent: ' + info.response);

          // send email SUCCESS --------------------------
          res.status(200).json({ error: false, message: 'Email sent' });
          return resolve();
        }
      });
    } else {
      // error => invalid req method
      res.status(405).json({ error: true, message: 'Only support POST req' });
      return resolve();
    }
  });
}
