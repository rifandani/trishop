import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { createTransport } from 'nodemailer'
// files
import withYup from 'middlewares/withYup'
import initMiddleware from 'middlewares/initMiddleware'
import { contactApiSchema } from 'yup/apiSchema'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await cors(req, res) // Run cors

    if (req.method === 'POST') {
      // destructure request body form
      const { email, subject, message } = req.body

      // create transport
      const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: process.env.CONTACT_EMAIL,
          pass: process.env.CONTACT_PASS,
        },
      })

      // mail options
      const mailOptions = {
        from: email,
        to: process.env.CONTACT_EMAIL,
        subject: `TriShop Contact - ${subject}`,
        text: `Email from: ${email}. Message: ${message}`,
      }

      // send email
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error(error)

          // client error => -----------------------------------------------------------------
          res.status(400).json({
            error: true,
            message: 'Send email error',
          })
          return
        } else {
          // POST SUCCESS => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          res.status(201).json({ error: false, message: 'Email sent' })
        }
      })
    } else {
      // client error => invalid req method -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only support POST req',
      })
    }
  } catch (err) {
    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({ error: true, name: err.name, message: err.message })
  }
}

export default withYup(contactApiSchema, handler)
