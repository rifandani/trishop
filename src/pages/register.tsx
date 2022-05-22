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
import { register } from 'services/auth'
import { AuthCookiePayload } from 'types'
import { registerApiSchema, TRegisterApiSchema } from 'yup/apiSchema'

const RegisterPage: NextPage = () => {
  //#region GENERAL
  const { push } = useRouter()
  const [, setUser] = useLocalStorage<UserPayload>('user', null)
  //#endregion

  //#region FORM
  const initialValues: TRegisterApiSchema = {
    name: '',
    email: '',
    password: '',
  }

  const onSubmitForm = async (
    values: TRegisterApiSchema,
    actions: FormikHelpers<TRegisterApiSchema>
  ) => {
    try {
      // call register service
      const { status, data } = await register(values)

      // client error
      if (status !== 201) {
        toast.error(data.message)
        return
      }

      // set data user to local storage
      setUser(data.data)

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
        {/* <!-- Register Section --> */}
        <article className="flex w-full flex-col md:w-1/2">
          <section className="flex justify-center pt-12 md:-mb-12 md:justify-start md:pl-12">
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
            <p className="text-center text-3xl">Join Us</p>

            {/* <!-- START form --> */}
            <Formik
              initialValues={initialValues}
              validationSchema={registerApiSchema}
              onSubmit={onSubmitForm}
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
                      placeholder="Elon Musk"
                      name="name"
                      type="text"
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
                      placeholder="******"
                      name="password"
                      type="password"
                    />

                    <ErrorMessage
                      className="error-message"
                      name="password"
                      component="span"
                    />
                  </div>

                  <button
                    className="mt-8 cursor-pointer rounded bg-orange-800 p-2 text-lg font-bold text-white hover:underline focus:ring-4 focus:ring-orange-500 disabled:opacity-50"
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
                  <a className="cursor-pointer font-semibold underline hover:text-orange-800">
                    Log in here.
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
              src="/images/cover/tabur-coklat.jpg"
              alt="register page cover"
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

export default RegisterPage
