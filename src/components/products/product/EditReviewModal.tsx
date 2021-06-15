import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
// files
import { IPutReviewResponse, IReview } from 'types/Review'
import { putReviewApiSchema, TPutReviewApiSchema } from 'yup/apiSchema'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  review: IReview
}

export default function EditReviewModal({
  isOpen,
  setIsOpen,
  review,
}: Props): JSX.Element {
  // hooks
  const { push } = useRouter()

  const initialValues: TPutReviewApiSchema = {
    reviewerName: review.reviewerName,
    star: review.star,
    comment: review.comment,
  }

  const onSubmit = async (
    values: TPutReviewApiSchema,
    actions: FormikHelpers<TPutReviewApiSchema>
  ): Promise<void> => {
    try {
      const res = await axios.put<IPutReviewResponse>(
        `/admin/reviews/${review._id}`,
        {
          ...values,
          star: +values.star,
        }
      )

      // client error
      if (res.status === 401) {
        toast.error(res.data.message)
        await push('/login')
        return
      } else if (res.status !== 201) {
        toast.error(res.data.message)
        return
      }

      // success
      toast.success('Review updated. Refresh to revalidate')
      setIsOpen(false)
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        className="fixed inset-0 z-30 overflow-y-auto"
        as="div"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                className="mb-2 text-lg font-medium leading-6 text-center text-orange-800"
                as="h3"
              >
                Edit Review
              </Dialog.Title>

              {/* START FORM */}
              <Formik
                initialValues={initialValues}
                validationSchema={putReviewApiSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="grid gap-6">
                    <div className="overflow-hidden shadow-lg sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          {/* name - text */}
                          <div className="col-span-6">
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
                          <div className="col-span-6">
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

                            <ErrorMessage
                              className="error-message"
                              name="star"
                              component="span"
                            />
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
                    </div>

                    {/* submit button */}
                    <button
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-800 border border-transparent rounded-md focus:ring-4 focus:ring-orange-500 disabled:opacity-50 hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Loading...' : 'Update'}
                    </button>

                    {/* back button */}
                    <button
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-orange-800 border border-orange-800 rounded-md focus:ring-4 focus:ring-orange-500 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-800"
                      type="button"
                      onClick={() => setIsOpen(false)}
                    >
                      Back
                    </button>
                  </Form>
                )}
              </Formik>
              {/* END FORM */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
