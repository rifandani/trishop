import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { httpPost } from 'services/http'
import { TUserApiSchema, userApiSchema } from 'yup/apiSchema'

const AddUser: FC = () => {
  //#region GENERAL
  const { push } = useRouter()
  //#endregion

  //#region FORM
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
  //#endregion

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200">
      {/* Add New User */}
      <section className="mt-10 p-6 sm:mt-0">
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

          <div className="mt-5 md:col-span-2 md:mt-0">
            {/* START FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={userApiSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
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
                            className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                            className="focus:shadow-outline-blue form-select mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                            className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                            className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                    <div className="bg-green-100 px-4 py-3 text-right sm:px-6">
                      <button
                        className="focus:shadow-outline-blue rounded-md border border-transparent bg-green-500 px-6 py-2 text-sm font-medium leading-5 text-white shadow-sm transition duration-150 ease-in-out hover:bg-green-600 focus:outline-none active:bg-green-600 disabled:opacity-50"
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

export default AddUser