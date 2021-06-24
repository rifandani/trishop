import axios from 'axios'
import Link from 'next/link'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
// files
import useLocalStorage from 'hooks/useLocalStorage'
import { AuthCookiePayload } from 'types'
import { UserPayload } from 'contexts/UserReducer'
import { APIResponseAuthLoginRegister } from 'types/User'
import { loginApiSchema, TLoginApiSchema } from 'yup/apiSchema'

export default function Login(): JSX.Element {
  const initialValues: TLoginApiSchema = {
    email: '',
    password: '',
  }

  // hooks
  const { push } = useRouter()
  const [, setUser] = useLocalStorage<UserPayload>('user', null)

  const onLogin = async (
    values: TLoginApiSchema,
    actions: FormikHelpers<TLoginApiSchema>
  ) => {
    try {
      // POST /auth/login
      const res = await axios.post<APIResponseAuthLoginRegister>(
        '/auth/login',
        values
      )

      // client error
      if (res.status !== 201) {
        toast.error(res.data.message)
        return
      }

      // set data user to local storage
      setUser(res.data.data)

      // if role == 'ADMIN'
      if (res.data.data.role === 'ADMIN') {
        await push('/admin/dashboard')
        toast.success(`Welcome, ${res.data.data.name}`)
        return
      }

      // if role == 'USER'
      await push('/user/dashboard')
      toast.success(`Welcome, ${res.data.data.name}`)
    } catch (err) {
      // 500 - server error
      console.error(err)
      toast.error(err.message)
    } finally {
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
            <p className="text-3xl text-center" data-cy="welcome">
              Welcome
            </p>

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
                      data-cy="email"
                      autoFocus
                    />

                    <ErrorMessage
                      className="error-message"
                      component="span"
                      name="email"
                      data-cy="error-email"
                    />
                  </div>

                  {/* <!-- password --> */}
                  <div className="flex flex-col pt-4">
                    <label htmlFor="password" className="text-lg">
                      Password
                    </label>

                    <Field
                      className="mt-1"
                      placeholder="******"
                      name="password"
                      type="password"
                      data-cy="password"
                    />

                    <ErrorMessage
                      className="error-message"
                      component="span"
                      name="password"
                      data-cy="error-password"
                    />
                  </div>

                  <button
                    className="p-2 mt-8 text-lg font-bold text-white bg-orange-800 rounded cursor-pointer focus:ring-4 focus:ring-orange-500 disabled:opacity-50 hover:underline"
                    disabled={isSubmitting}
                    type="submit"
                    data-cy="submit"
                  >
                    {isSubmitting ? 'Loading...' : 'Login'}
                  </button>
                </Form>
              )}
            </Formik>
            {/* <!-- End FORM --> */}

            <div className="pt-12 pb-12 text-center">
              <p>
                Don&apos;t have an account?{' '}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parse(ctx.req.headers?.cookie ?? '')
  const authCookie = cookies.auth

  // kalau auth cookie tidak ada === belum login
  if (!authCookie) {
    return {
      props: {},
    }
  }

  // verify auth cookie
  const decoded = verify(
    authCookie,
    process.env.MY_SECRET_KEY
  ) as AuthCookiePayload
  const role = decoded.role

  // kalau user role === ADMIN
  if (role === 'ADMIN') {
    return {
      redirect: { destination: '/admin/dashboard', permanent: false },
    }
  }

  // user role === USER
  return {
    redirect: { destination: '/user/dashboard', permanent: false },
  }
}
