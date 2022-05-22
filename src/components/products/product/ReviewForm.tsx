import { UserPayload } from 'contexts/UserReducer'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import useLocalStorage from 'hooks/useLocalStorage'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { httpPost } from 'services/http'
import { mutate } from 'swr'
import { IPostReviewResponse } from 'types/Review'
import { putReviewApiSchema, TPutReviewApiSchema } from 'yup/apiSchema'

//#region INTERFACE
interface Props {
  productRef: string
}
//#endregion

const ReviewForm: FC<Props> = ({ productRef }) => {
  //#region GENERAL
  const { push } = useRouter()
  const [user] = useLocalStorage<UserPayload>('user', null)
  //#endregion

  //#region FORM
  const initialValues: TPutReviewApiSchema = {
    reviewerName: '',
    star: 1,
    comment: '',
  }

  const onSubmit = async (
    values: TPutReviewApiSchema,
    actions: FormikHelpers<TPutReviewApiSchema>
  ): Promise<void> => {
    try {
      // if not logged in
      if (!user) {
        toast.warn('Please login first')
        actions.setSubmitting(false) // finish formik cycle
        return
      }

      const newReview = {
        productRef,
        reviewerId: user._id, // logged in user _id
        reviewerName: values.reviewerName,
        comment: values.comment,
        star: +values.star,
      }

      const res = await httpPost<IPostReviewResponse>(
        '/user/reviews',
        newReview
      )

      // client error
      if (res.status === 401) {
        await push('/login')
        toast.error(res.data.message)
        return
      } else if (res.status !== 201) {
        toast.error(res.data.message)
        return
      }

      // success
      toast.success('Review added')
      await mutate(`/public/products/${productRef}`)
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      actions.resetForm() // reset form
      actions.setSubmitting(false) // finish formik cycle
    }
  }
  //#endregion

  return (
    <main className="relative mx-auto flex w-full max-w-7xl items-center justify-center bg-white">
      <section className="mt-10 w-full p-14 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-600">
                Your review could be seen by everyone. Please be polite.
              </p>
            </div>
          </div>

          <div className="mt-5 md:col-span-2 md:mt-0">
            {/* START FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={putReviewApiSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="">
                  <div className="overflow-hidden shadow-lg sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        {/* name - text */}
                        <div className="col-span-3">
                          <label
                            htmlFor="reviewerName"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Name
                          </label>

                          <Field
                            className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                            placeholder="Write your name..."
                            name="reviewerName"
                            type="text"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="reviewerName"
                            component="span"
                          />
                        </div>

                        {/* stars - select */}
                        <div className="col-span-3">
                          <label
                            htmlFor="star"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Stars
                          </label>

                          <Field
                            className="focus:shadow-outline-blue form-select mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                            name="star"
                            as="select"
                          >
                            <option value={1}>⭐</option>
                            <option value={2}>⭐⭐</option>
                            <option value={3}>⭐⭐⭐</option>
                            <option value={4}>⭐⭐⭐⭐</option>
                            <option value={5}>⭐⭐⭐⭐⭐</option>
                          </Field>
                        </div>

                        {/* comment - textarea */}
                        <div className="col-span-6">
                          <label
                            htmlFor="comment"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Comment
                          </label>

                          <Field
                            className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                            placeholder="Write your comment about this product..."
                            name="comment"
                            type="text"
                            as="textarea"
                            rows="3"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="comment"
                            component="span"
                          />
                        </div>
                      </div>
                    </div>

                    {/* submit button */}
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        className="focus:shadow-outline-blue rounded-md border border-transparent bg-orange-800 px-4 py-2 text-sm font-medium leading-5 text-white shadow-sm transition duration-150 ease-in-out hover:bg-orange-500 focus:outline-none active:bg-orange-800"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Loading...' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            {/* END FORM */}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ReviewForm
