import { UserPayload } from 'contexts/UserReducer'
import { parse } from 'cookie'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import useLocalStorage from 'hooks/useLocalStorage'
import { verify } from 'jsonwebtoken'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { login } from 'services/auth'
import { AuthCookiePayload } from 'types'
import { loginApiSchema, TLoginApiSchema } from 'yup/apiSchema'

const LoginPage: NextPage = () => {
  //#region GENERAL
  const { push } = useRouter()
  const [, setUser] = useLocalStorage<UserPayload>('user', null)
  //#endregion

  //#region FORM
  const initialValues: TLoginApiSchema = {
    email: '',
    password: '',
  }

  const onSubmitForm = async (
    values: TLoginApiSchema,
    actions: FormikHelpers<TLoginApiSchema>
  ) => {
    try {
      // call login API
      const { status, data } = await login(values)

      // client error
      if (status !== 201) {
        toast.error(data.message)
        return
      }

      // set data user to local storage
      setUser(data.data)

      // if role == 'ADMIN'
      if (data.data.role === 'ADMIN') {
        await push('/admin/dashboard')
        toast.success(`Welcome, ${data.data.name}`)
        return
      }

      // if role == 'USER'
      await push('/user/dashboard')
      toast.success(`Welcome, ${data.data.name}`)
    } catch (err) {
      // 500 - server error
      console.error(err)
      toast.error(err.message)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }
  //#endregion

  return (
    <main className="my-custom-font-family h-screen bg-white">
      <div className="flex w-full flex-wrap">
        {/* <!-- Login Section --> */}
        <article className="flex w-full flex-col md:w-1/2">
          <section className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
            <Link href="/">
              <a className="relative h-16 w-16 cursor-pointer">
                <Image
                  src="/images/trishop.png"
                  alt="trishop logo"
                  className="rounded"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  priority
                />
              </a>
            </Link>
          </section>

          <section className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
            <p className="text-center text-3xl" data-cy="welcome">
              Welcome
            </p>

            {/* <!-- Start FORM --> */}
            <Formik
              initialValues={initialValues}
              validationSchema={loginApiSchema}
              onSubmit={onSubmitForm}
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
                    className="mt-8 cursor-pointer rounded bg-orange-800 p-2 text-lg font-bold text-white hover:underline focus:ring-4 focus:ring-orange-500 disabled:opacity-50"
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
                  <a className="cursor-pointer font-semibold underline hover:text-orange-800">
                    Register here.
                  </a>
                </Link>
              </p>
            </div>
          </section>
        </article>

        {/* <!-- Image Section --> */}
        <article className="w-1/2 shadow-2xl">
          <span className="relative hidden h-screen w-full md:block">
            <Image
              src="/images/cover/potong-coklat.jpg"
              alt="login page cover"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              priority
            />
          </span>
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

export default LoginPage
