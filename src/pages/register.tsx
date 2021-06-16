import axios from 'axios'
import Link from 'next/link'
import { parse } from 'cookie'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
// files
import useLocalStorage from 'hooks/useLocalStorage'
import { TRegisterApiSchema, registerApiSchema } from 'yup/apiSchema'
import { IAuthLoginRegister } from 'types/User'
import { UserPayload } from 'contexts/UserReducer'

export default function RegisterPage(): JSX.Element {
  const initialValues: TRegisterApiSchema = {
    name: '',
    email: '',
    password: '',
  }

  // hooks
  const { push } = useRouter()
  const [, setUser] = useLocalStorage<UserPayload>('user', null)

  const onRegister = async (
    values: TRegisterApiSchema,
    actions: FormikHelpers<TRegisterApiSchema>
  ) => {
    try {
      // POST /auth/register
      const res = await axios.post<IAuthLoginRegister>('/auth/register', values)

      // client error
      if (res.status !== 201) {
        toast.error(res.data.message)
        return
      }

      // set data user to local storage
      setUser(res.data.data)

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
                    className="p-2 mt-8 text-lg font-bold text-white bg-orange-800 rounded cursor-pointer hover:underline disabled:opacity-50 focus:ring-4 focus:ring-orange-500"
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parse(ctx.req.headers?.cookie ?? '')
  const authCookie = cookies.auth

  // kalau auth cookie sudah ada
  if (authCookie) {
    return {
      redirect: { destination: '/user/dashboard', permanent: false },
    }
  }

  return {
    props: {},
  }
}
