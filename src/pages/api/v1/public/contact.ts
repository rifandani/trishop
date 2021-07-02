import { createTransport } from 'nodemailer'
// files
import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withYupConnect from 'middlewares/withYupConnect'
import { contactApiSchema } from 'yup/apiSchema'

export default nc
  .use(withCors(['POST'])) // cors
  .use(withYupConnect(contactApiSchema)) // yup middleware
  .post('/api/v1/public/contact', async (req, res) => {
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
  })
