import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { httpPost } from 'services/http'
import { TUserApiSchema, userApiSchema } from 'yup/apiSchema'

export default function AddUser(): JSX.Element {
  // hooks
  const { push } = useRouter()

  const initialValues: TUserApiSchema = {
    name: '',
    email: '',
    role: 'ROLE',
    password: '',
  }

  const onSubmit = async (
    values: TUserApiSchema,
    actions: FormikHelpers<TUserApiSchema>
  ): Promise<void> => {
    try {
      // POST /admin/users
      await httpPost('/admin/users', values)

      // success
      await push('/admin/dashboard')
      toast.success('User created')
    } catch (err) {
      console.error(err)
      toast.error(err.data.message)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      {/* Add New User */}
      <section className="p-6 mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add New User
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Choose the role between USER or ADMIN.
              </p>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            {/* START FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={userApiSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        {/* name */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Name
                          </label>

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            placeholder="Your name..."
                            type="text"
                            name="name"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="name"
                            component="span"
                          />
                        </div>

                        {/* role */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Role
                          </label>

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            as="select"
                            name="role"
                          >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                          </Field>

                          <ErrorMessage
                            className="error-message"
                            name="role"
                            component="span"
                          />
                        </div>

                        {/* email */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Email
                          </label>

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            placeholder="Your email..."
                            type="email"
                            name="email"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="email"
                            component="span"
                          />
                        </div>

                        {/* password */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Password
                          </label>

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            placeholder="******"
                            type="password"
                            name="password"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="password"
                            component="span"
                          />
                        </div>
                      </div>
                    </div>

                    {/* submit button */}
                    <div className="px-4 py-3 text-right bg-green-100 sm:px-6">
                      <button
                        className="px-6 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-500 border border-transparent rounded-md shadow-sm disabled:opacity-50 hover:bg-green-600 focus:outline-none focus:shadow-outline-blue active:bg-green-600"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Loading' : 'Add New'}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </main>
  )
}
