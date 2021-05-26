import withYup from 'middlewares/withYup'
import { NextApiRequest, NextApiResponse } from 'next'
import { createTransport } from 'nodemailer'
// files
import { contactApiSchema } from 'yup/apiSchema'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // destructure request body form
    const { email, subject, message } = req.body

    // create transport
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'tri.rifandani@gmail.com',
        pass: 'rifandani098765Aa@',
      },
    })

    // mail options
    const mailOptions = {
      from: email,
      to: 'tri.rifandani@gmail.com',
      subject: `TriShop Contact - ${subject}`,
      text: `Email from: ${email}. Message: ${message}`,
    }

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error)

        // client error => -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message: 'Send email error',
        })
        return
      } else {
        console.log('Email sent: ' + info.response)

        // POST SUCCESS => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(201).json({ error: false, message: 'Email sent' })
      }
    })
  } else {
    // client error => invalid req method -----------------------------------------------------------------
    res.status(405).json({ error: true, message: 'Only support POST req' })
  }
}

export default withYup(contactApiSchema, handler)
