import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
// files
import DatePickerField from '../DatePickerField'
import { couponApiSchema } from 'yup/apiSchema'
import { IAddAndEditCoupon } from 'types/Coupon'

export default function AddCoupon(): JSX.Element {
  // hooks
  const { push } = useRouter()

  const initialValues: IAddAndEditCoupon = {
    code: '',
    discount: 0,
    minTransaction: 0,
    desc: '',
    validUntil: Date.now(),
  }

  const onSubmit = async (
    values: IAddAndEditCoupon,
    actions: FormikHelpers<IAddAndEditCoupon>
  ): Promise<void> => {
    try {
      // POST /admin/coupons
      const res = await Axios.post('/admin/coupons', values, {
        validateStatus: (status) => status < 500, // Resolve only if the status code is less than 500
      })

      // client error
      if (res.status !== 201) {
        toast.error(res.data.message)
        return
      }

      // success
      toast.success('Coupon created')
      await push('/admin/dashboard')
      actions.setSubmitting(false) // finish formik cycle
    } catch (err) {
      console.error(err.toJSON())
      toast.error(err.message)
      actions.setSubmitting(false) // finish formik cycle
    }
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      {/* Add New Coupon */}
      <section className="p-6 mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add New Coupon
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Use a unique coupon code.
              </p>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Coupon discount could be a float (0.25 = 25%) or discount in
                number (50000).
              </p>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            {/* START FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={couponApiSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        {/* code */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="code"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Code
                          </label>

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            placeholder="Unique coupon code..."
                            type="text"
                            name="code"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="code"
                            component="span"
                          />
                        </div>

                        {/* discount - float || number */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="discount"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Discount
                          </label>

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            placeholder="Coupon discount..."
                            type="number"
                            name="discount"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="discount"
                            component="span"
                          />
                        </div>

                        {/* minTransaction */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="minTransaction"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Minimal Transaction
                          </label>

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            placeholder="Minimal transaction..."
                            type="number"
                            name="minTransaction"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="minTransaction"
                            component="span"
                          />
                        </div>

                        {/* desc */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="desc"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Description
                          </label>

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            placeholder="Describe your coupon promotion..."
                            as="textarea"
                            name="desc"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="desc"
                            component="span"
                          />
                        </div>

                        {/* validUntil */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="validUntil"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Valid Until
                          </label>

                          <DatePickerField
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            name="validUntil"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="validUntil"
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
                        {isSubmitting ? 'Loading' : 'Add New Coupon'}
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
