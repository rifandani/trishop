import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import axios from 'axios'
// files
import { TRegisterApiSchema, registerApiSchema } from 'yup/apiSchema'

export default function RegisterPage() {
  const initialValues: TRegisterApiSchema = {
    name: '',
    email: '',
    password: '',
  }

  // hooks
  const router = useRouter()

  const onRegister = async (
    values: TRegisterApiSchema,
    actions: FormikHelpers<TRegisterApiSchema>
  ) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    }

    try {
      // POST /auth/register
      await axios.post('/auth/register', newUser)

      // role === 'USER'
      await router.push('/products')
      toast.success('Register success')
      actions.setSubmitting(false) // finish formik cycle
    } catch (err) {
      toast.error(err.message)
      console.error('onRegister error ⛔ =>', err)
      actions.setSubmitting(false) // finish formik cycle
    }
  }

  return (
    <main className="h-screen bg-white my-custom-font-family">
      <div className="flex flex-wrap w-full">
        {/* <!-- Register Section --> */}
        <article className="flex flex-col w-full md:w-1/2">
          <section className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-12">
            <Link href="/">
              <img
                className="w-16 h-16 rounded cursor-pointer"
                src="images/trishop.png"
                alt="trishop logo"
              />
            </Link>
          </section>

          <section className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">Join Us</p>

            {/* <!-- START form --> */}
            <Formik
              initialValues={initialValues}
              validationSchema={registerApiSchema}
              onSubmit={onRegister}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col pt-3 md:pt-8">
                  {/* <!-- name --> */}
                  <div className="flex flex-col pt-4">
                    <label htmlFor="name" className="text-lg">
                      Name
                    </label>

                    <Field
                      className="mt-1"
                      name="name"
                      type="text"
                      placeholder="Elon Musk"
                      autoFocus
                    />

                    <ErrorMessage
                      className="error-message"
                      name="name"
                      component="span"
                    />
                  </div>

                  {/* <!-- email --> */}
                  <div className="flex flex-col pt-4">
                    <label htmlFor="email" className="text-lg">
                      Email
                    </label>

                    <Field
                      className="mt-1"
                      placeholder="elonmusk@gmail.com"
                      type="email"
                      name="email"
                    />

                    <ErrorMessage
                      className="error-message"
                      name="email"
                      component="span"
                    />
                  </div>

                  {/* <!-- password --> */}
                  <div className="flex flex-col pt-4">
                    <label htmlFor="password" className="text-lg">
                      Password
                    </label>

                    <Field
                      className="mt-1"
                      name="password"
                      type="password"
                      placeholder="******"
                    />

                    <ErrorMessage
                      className="error-message"
                      name="password"
                      component="span"
                    />
                  </div>

                  <button
                    className={`${
                      isSubmitting ? 'opacity-50' : 'opacity-100'
                    } p-2 mt-8 text-lg font-bold text-white bg-orange-800 rounded cursor-pointer hover:underline`}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? 'Loading' : 'Register'}
                  </button>
                </Form>
              )}
            </Formik>
            {/* <!-- END form --> */}

            <div className="pt-8 pb-8 text-center">
              <p>
                Already have an account?{' '}
                <Link href="/login">
                  <a className="font-semibold underline cursor-pointer hover:text-orange-800">
                    Log in here.
                  </a>
                </Link>
              </p>
            </div>
          </section>
        </article>

        {/* <!-- Image Section --> */}
        <article className="w-1/2 shadow-2xl">
          <img
            className="hidden object-cover w-full h-screen md:block"
            src="images/cover/tabur-coklat.jpg"
            alt="register page cover"
          />
        </article>
      </div>
    </main>
  )
}
