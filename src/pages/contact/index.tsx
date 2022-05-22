import Footer from 'components/common/Footer'
import Nav from 'components/common/Nav'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShareAlt,
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { httpPost } from 'services/http'
import { HttpResponse } from 'types'
import { contactApiSchema, TContactApiSchema } from 'yup/apiSchema'

const ContactPage: NextPage = () => {
  //#region FORM
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
      const res = await httpPost<HttpResponse>('/public/contact', data)

      // client error
      if (res.status !== 201) {
        toast.error(res.data.message)
        return
      }

      // success
      toast.success(res.data.message)
    } catch (err) {
      toast.error(err.message)
      console.error(err)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }
  //#endregion

  return (
    <>
      <NextSeo
        title="Contact"
        description="Our shop contact service gives customers the support they need when shopping online. Whether by phone, chat, or even email, we make sure that everything responded professionally."
      />

      <Nav />

      {/* contact */}
      <main className="min-w-screen relative mt-16 flex min-h-screen items-center justify-center bg-white">
        <div className="container mx-auto h-full max-w-5xl overflow-hidden rounded-lg shadow-lg">
          <div className="h-full sm:flex">
            {/* contact links */}
            <aside className="w-full rounded-none bg-orange-100 p-10 sm:rounded md:w-1/3">
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
                  <FaPhoneAlt className="mt-1 h-8 w-8 text-orange-800" />
                </div>

                <div className="ml-10 flex-grow md:ml-5">
                  <div className="mb- text-base font-medium">Phone</div>
                  <span className="text-md text-gray-500">
                    +62-822-4319-9535
                  </span>
                </div>
              </div>

              {/* address */}
              <div className="flex items-start py-3">
                <div className="flex-shrink">
                  <FaMapMarkerAlt className="h-8 w-8 text-orange-800" />
                </div>

                <div className="ml-10 flex-grow md:ml-5">
                  <div className="text-base font-medium">Address</div>
                  <span className="text-md text-gray-500">
                    Jalan Gejayan Sambu 3 Yogyakarta
                  </span>
                </div>
              </div>

              {/* social medias */}
              <div className="flex items-start py-3 pb-5">
                <div className="flex-shrink">
                  <FaShareAlt className="h-8 w-8 text-orange-800" />
                </div>

                <div className="ml-10 flex-grow md:ml-5">
                  <div className="mb-2 text-base font-medium">Social</div>

                  <div className="text-md flex space-x-3 text-white sm:text-gray-500">
                    <a
                      className="text-red-500 hover:text-red-800"
                      href="https://www.instagram.com/3richkey"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">Instagram</span>
                      <FaInstagram className="h-6 w-6" />
                    </a>

                    <a
                      className="text-blue-500 hover:text-blue-800"
                      href="https://www.linkedin.com/in/rifandani/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <FaLinkedin className="h-6 w-6" />
                    </a>

                    <a
                      className="text-gray-500 hover:text-gray-800"
                      href="https://github.com/rifandani"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">GitHub</span>
                      <FaGithub className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* inputs contact */}
            <section className="flex w-full items-center justify-center bg-white p-10 md:w-2/3">
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
                        className=""
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
                        className=""
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
                        className=" focus:shadow-outline"
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
                        className="focus:shadow-outline flex rounded-md bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 hover:text-white focus:border-indigo-300 focus:outline-none disabled:opacity-50"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <FaEnvelope className="h-4 self-center fill-current" />

                        <span className="float-left ml-3 self-center text-base font-medium">
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
      </main>

      <Footer />
    </>
  )
}

export default ContactPage
