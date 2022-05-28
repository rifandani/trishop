import { DatePickerField } from 'components/common/DatePickerField'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { postAdminCoupon } from 'services/admin/coupons'
import { IAddAndEditCoupon } from 'types/Coupon'
import { couponApiSchema } from 'yup/apiSchema'

const AddCoupon: FC = () => {
  //#region FORM
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
      // call admin coupons service
      const { status, data } = await postAdminCoupon(values)

      // client error
      if (status !== 201) {
        toast.error(data.message)
        return
      }

      // success
      await push('/admin/dashboard')
      toast.success('Coupon created')
    } catch (err) {
      console.error(err.toJSON())
      toast.error(err.message)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }
  //#endregion

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200">
      {/* Add New Coupon */}
      <section className="mt-10 p-6 sm:mt-0">
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

          <div className="mt-5 md:col-span-2 md:mt-0">
            {/* START FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={couponApiSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
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
                            className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                            className="focus:shadow-outline-blue form-select mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                            className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                            className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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

                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="validUntil"
                            className="mb-2 block text-sm font-medium leading-5 text-gray-700"
                          >
                            Valid Until
                          </label>

                          <Field
                            component={DatePickerField}
                            name="validUntil"
                            label={'Choose date'}
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
                    <div className="bg-green-100 px-4 py-3 text-right sm:px-6">
                      <button
                        className="focus:shadow-outline-blue rounded-md border border-transparent bg-green-500 px-6 py-2 text-sm font-medium leading-5 text-white shadow-sm transition duration-150 ease-in-out hover:bg-green-600 focus:outline-none active:bg-green-600 disabled:opacity-50"
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

export default AddCoupon
