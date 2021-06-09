import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import axios from 'axios'
// files
import { loginApiSchema, TLoginApiSchema } from 'yup/apiSchema'
import useLocalStorage from 'hooks/useLocalStorage'

interface PostAuthLogin {
  error: boolean
  userId: string
  role: 'ADMIN' | 'USER'
}

export default function Login() {
  const initialValues: TLoginApiSchema = {
    email: '',
    password: '',
  }

  // hooks
  const { push } = useRouter()
  const [, setValue] = useLocalStorage('user', '')

  const onLogin = async (
    values: TLoginApiSchema,
    actions: FormikHelpers<TLoginApiSchema>
  ) => {
    const user = {
      email: values.email,
      password: values.password,
    }

    try {
      // POST /auth/login
      const res = await axios.post<PostAuthLogin>('/auth/login', user)

      // set to local storage
      setValue(res.data.userId)

      // if role == 'ADMIN'
      if (res.data.role === 'ADMIN') {
        await push('/admin/dashboard')
        toast.success('Welcome to admin dashboard')
        return
      }

      // if role == 'USER'
      await push('/products')
      toast.success('You are logged in')
      actions.setSubmitting(false) // finish formik cycle
    } catch (err) {
      console.error('⛔ =>', err)
      toast.error(`${err.message}`)
      actions.setSubmitting(false) // finish formik cycle
    }
  }

  return (
    <main className="h-screen bg-white my-custom-font-family">
      <div className="flex flex-wrap w-full">
        {/* <!-- Login Section --> */}
        <article className="flex flex-col w-full md:w-1/2">
          <section className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <Link href="/">
              <img
                className="w-16 h-16 rounded cursor-pointer"
                src="images/trishop.png"
                alt="trishop logo"
              />
            </Link>
          </section>

          <section className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">Welcome</p>

            {/* <!-- Start FORM --> */}
            <Formik
              initialValues={initialValues}
              validationSchema={loginApiSchema}
              onSubmit={onLogin}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col pt-3 md:pt-8">
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
                      autoFocus
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
                    className="p-2 mt-8 text-lg font-bold text-white bg-orange-800 rounded cursor-pointer focus:ring-2 focus:ring-orange-500 disabled:opacity-50 hover:underline"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Loading' : 'Login'}
                  </button>
                </Form>
              )}
            </Formik>
            {/* <!-- End FORM --> */}

            <div className="pt-12 pb-12 text-center">
              <p>
                Don't have an account?{' '}
                <Link href="/register">
                  <a className="font-semibold underline cursor-pointer hover:text-orange-800">
                    Register here.
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
            src="images/cover/potong-coklat.jpg"
            alt="login page cover"
          />
        </article>
      </div>
    </main>
  )
}
