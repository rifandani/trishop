import axios from 'axios'
import { mutate } from 'swr'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
// files
import useLocalStorage from 'hooks/useLocalStorage'
import { putReviewApiSchema, TPutReviewApiSchema } from 'yup/apiSchema'
import { IPostReviewResponse } from 'types/Review'
import { UserPayload } from 'contexts/UserReducer'

interface ReviewFormProps {
  productRef: string
}

export default function ReviewForm({
  productRef,
}: ReviewFormProps): JSX.Element {
  // hooks
  const [user] = useLocalStorage<UserPayload>('user', null) // local storage
  const { push } = useRouter()

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

      const res = await axios.post<IPostReviewResponse>(
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

  return (
    <main className="relative flex items-center justify-center w-full mx-auto bg-white max-w-7xl">
      <section className="w-full p-6 mt-10 sm:mt-0">
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

          <div className="mt-5 md:mt-0 md:col-span-2">
            {/* START FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={putReviewApiSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="">
                  <div className="overflow-hidden shadow-lg sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
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
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
                    <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                      <button
                        className="px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-orange-800 border border-transparent rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:shadow-outline-blue active:bg-orange-800"
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

// <article className="flex flex-col w-full -mx-4 md:flex-row">
//   <section className="flex">Review htmlForm</section>
// </article>
