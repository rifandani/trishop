import { toast } from 'react-toastify'
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaShareAlt,
  FaEnvelope,
} from 'react-icons/fa'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import axios from 'axios'
// files
import Nav from '../components/Nav'
import { contactApiSchema, TContactApiSchema } from 'yup/apiSchema'

const Contact = () => {
  const initialValues: TContactApiSchema = {
    email: '',
    subject: '',
    message: '',
  }

  async function onSubmit(
    values: TContactApiSchema,
    actions: FormikHelpers<TContactApiSchema>
  ) {
    const data = {
      email: values.email,
      subject: values.subject,
      message: values.message,
    }

    try {
      // POST email form
      const res = await axios.post('/contact', data)

      toast.success(res.data.message)
      actions.setSubmitting(false) // finish formik cycle
    } catch (err) {
      toast.error(err.message)
      console.error(err)
      actions.setSubmitting(false) // finish formik cycle
    }
  }

  return (
    <>
      <Nav />

      {/* contact */}
      <article className="relative flex items-center justify-center min-h-screen mt-16 min-w-screen bg-gradient-to-r from-orange-800 via-orange-500 to-orange-200">
        <div className="container h-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow">
          <div className="h-full sm:flex">
            {/* contact links */}
            <aside className="w-full p-10 bg-orange-100 rounded-none md:w-1/3 sm:rounded">
              <h2 className="text-2xl font-extrabold leading-8 tracking-tight text-orange-800 sm:text-2xl sm:leading-9">
                Contact Us
              </h2>

              <p className="mt-2 mb-5 text-sm text-black">
                You can find our contact info below or you can feel free to
                leave us a quick message in the form.
              </p>

              {/* phone */}
              <div className="flex items-start py-3 pt-5">
                <div className="flex-shrink">
                  <FaPhoneAlt className="w-8 h-8 mt-1 text-orange-800" />
                </div>

                <div className="flex-grow ml-10 md:ml-5">
                  <div className="text-base font-medium mb-">Phone</div>
                  <span className="text-gray-500 text-md">
                    +62-822-4319-9535
                  </span>
                </div>
              </div>

              {/* address */}
              <div className="flex items-start py-3">
                <div className="flex-shrink">
                  <FaMapMarkerAlt className="w-8 h-8 text-orange-800" />
                </div>

                <div className="flex-grow ml-10 md:ml-5">
                  <div className="text-base font-medium">Address</div>
                  <span className="text-gray-500 text-md">
                    Jalan Gejayan Sambu 3 Yogyakarta
                  </span>
                </div>
              </div>

              {/* social medias */}
              <div className="flex items-start py-3 pb-5">
                <div className="flex-shrink">
                  <FaShareAlt className="w-8 h-8 text-orange-800" />
                </div>

                <div className="flex-grow ml-10 md:ml-5">
                  <div className="mb-2 text-base font-medium">Social</div>

                  <div className="flex space-x-3 text-white text-md sm:text-gray-500">
                    <a
                      className="text-gray-400 hover:text-red-500"
                      href="https://www.instagram.com/3richkey"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">Instagram</span>
                      <FaInstagram className="w-6 h-6" />
                    </a>

                    <a
                      className="text-gray-400 hover:text-blue-500"
                      href="https://www.linkedin.com/in/rifandani/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <FaLinkedin className="w-6 h-6" />
                    </a>

                    <a
                      className="text-gray-400 hover:text-black"
                      href="https://github.com/rifandani"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">GitHub</span>
                      <FaGithub className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* inputs contact */}
            <section className="flex items-center justify-center w-full p-10 bg-white md:w-2/3">
              {/* START form */}
              <Formik
                initialValues={initialValues}
                validationSchema={contactApiSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="w-full">
                    {/* email */}
                    <div className="pb-3">
                      <label htmlFor="email" className="">
                        Email
                      </label>

                      <Field
                        className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
                        placeholder="elonmusk@gmail.com"
                        type="email"
                        name="email"
                        autoFocus
                      />

                      <ErrorMessage
                        className="error-message"
                        name="email"
                        component="span"
                      />
                    </div>

                    {/* subject */}
                    <div className="py-3">
                      <label htmlFor="subject" className="">
                        Subject
                      </label>

                      <Field
                        className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
                        placeholder="Subject - Trishop"
                        type="text"
                        name="subject"
                      />

                      <ErrorMessage
                        className="error-message"
                        name="subject"
                        component="span"
                      />
                    </div>

                    {/* message */}
                    <div className="py-3">
                      <label htmlFor="message" className="">
                        Message
                      </label>

                      <Field
                        className="w-full h-40 px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
                        placeholder="Your message here..."
                        as="textarea"
                        name="message"
                        rows={4}
                      />

                      <ErrorMessage
                        className="error-message"
                        name="message"
                        component="span"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        className="flex px-6 py-3 text-white bg-orange-500 rounded-md disabled:opacity-50 hover:bg-orange-600 hover:text-white focus:outline-none focus:shadow-outline focus:border-indigo-300"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <FaEnvelope className="self-center h-4 fill-current" />

                        <span className="self-center float-left ml-3 text-base font-medium">
                          {isSubmitting ? 'Loading' : 'Submit Message'}
                        </span>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              {/* START form */}
            </section>
          </div>
        </div>
      </article>
    </>
  )
}

export default Contact
