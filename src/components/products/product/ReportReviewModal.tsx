import { Dialog, Transition } from '@headlessui/react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { postUserReport } from 'services/user/reports'
import { IReview } from 'types/Review'
import { addReportSchema, TAddReportSchema } from 'yup/schema'

//#region INTERFACE
interface Props {
  reportIsOpen: boolean
  review: IReview
  userId: string
  setReportIsOpen: Dispatch<SetStateAction<boolean>>
}
//#endregion

const ReportReviewModal: FC<Props> = ({
  reportIsOpen,
  setReportIsOpen,
  review,
  userId,
}) => {
  //#region GENERAL
  const { push } = useRouter()
  //#endregion

  //#region FORM
  const initialValues: TAddReportSchema = {
    typeId: 1,
    argument: '',
  }

  const onSubmit = async (
    values: TAddReportSchema,
    actions: FormikHelpers<TAddReportSchema>
  ): Promise<void> => {
    try {
      const reportBody = {
        reviewRef: review._id,
        reporter: userId,
        argument: values.argument,
        typeId: +values.typeId, // number
      }

      // call postUserReport service
      const { status, data } = await postUserReport(reportBody)

      // client error
      if (status === 401) {
        toast.error(data.message)
        await push('/login')
        return
      } else if (status !== 201) {
        toast.error(data.message)
        return
      }

      // success
      toast.success('Review reported')
      setReportIsOpen(false)
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }
  //#endregion

  return (
    <Transition appear show={reportIsOpen} as={Fragment}>
      <Dialog
        className="fixed inset-0 z-30 overflow-y-auto"
        as="div"
        onClose={() => setReportIsOpen(false)}
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
                Report Review
              </Dialog.Title>

              {/* START FORM */}
              <Formik
                initialValues={initialValues}
                validationSchema={addReportSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="grid gap-6">
                    <div className="overflow-hidden shadow-lg sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          {/* typeId - select */}
                          <div className="col-span-6">
                            <label
                              htmlFor="typeId"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Type
                            </label>

                            <Field
                              className="focus:shadow-outline-blue form-select mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                              name="typeId"
                              as="select"
                            >
                              <option value={1}>
                                Bug or problem with the website
                              </option>
                              <option value={2}>
                                Spam or commercial unrelated to Trishop
                              </option>
                              <option value={3}>
                                Contains offensive or inappropriate content
                              </option>
                            </Field>

                            <ErrorMessage
                              className="error-message"
                              name="typeId"
                              component="span"
                            />
                          </div>

                          {/* argument - textarea */}
                          <div className="col-span-6">
                            <label
                              htmlFor="argument"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Argument
                            </label>

                            <Field
                              className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                              placeholder="Write your argument why you report it..."
                              name="argument"
                              type="text"
                              as="textarea"
                              rows="3"
                            />

                            <ErrorMessage
                              className="error-message"
                              name="argument"
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
                      {isSubmitting ? 'Loading...' : 'Report'}
                    </button>

                    {/* back button */}
                    <button
                      className="inline-flex justify-center rounded-md border border-orange-800 px-4 py-2 text-sm font-medium text-orange-800 hover:bg-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-500 focus-visible:ring-2 focus-visible:ring-orange-800 focus-visible:ring-offset-2"
                      type="button"
                      onClick={() => setReportIsOpen(false)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Loading...' : 'Back'}
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

export default ReportReviewModal
