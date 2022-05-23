import { Dialog, Transition } from '@headlessui/react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { httpPut } from 'services/http'
import { useSWRConfig } from 'swr'
import { IPutReviewResponse, IReview } from 'types/Review'
import { putReviewApiSchema, TPutReviewApiSchema } from 'yup/apiSchema'

//#region INTERFACE
interface Props {
  isOpen: boolean
  review: IReview
  productRef: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
//#endregion

const EditReviewModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  review,
  productRef,
}) => {
  //#region GENERAL
  const { push } = useRouter()
  const { mutate } = useSWRConfig()
  //#endregion

  //#region FORM
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
      const res = await httpPut<IPutReviewResponse>(
        `/user/reviews/${review._id}`,
        {
          ...values,
          star: +values.star,
        }
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
      toast.success('Review updated')
      setIsOpen(false)
      await mutate(`/public/products/${productRef}`)
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }
  //#endregion

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
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                className="mb-2 text-center text-lg font-medium leading-6 text-orange-800"
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
                      <div className="bg-white px-4 py-5 sm:p-6">
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
                          <div className="col-span-6">
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
                    </div>

                    {/* submit button */}
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-orange-800 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:opacity-50"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Loading...' : 'Update'}
                    </button>

                    {/* back button */}
                    <button
                      className="inline-flex justify-center rounded-md border border-orange-800 px-4 py-2 text-sm font-medium text-orange-800 hover:bg-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-500 focus-visible:ring-2 focus-visible:ring-orange-800 focus-visible:ring-offset-2"
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

export default EditReviewModal
