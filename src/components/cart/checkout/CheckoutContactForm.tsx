import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import useLocalStorage from 'hooks/useLocalStorage'
import { Dispatch, FC, SetStateAction } from 'react'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { ICheckout, IOrder } from 'types/LocalStorage'
import { checkoutContactSchema, TCheckoutContactSchema } from 'yup/schema'
import { CheckoutStep } from './CheckoutComp'

export interface StepProps {
  setStep: Dispatch<SetStateAction<CheckoutStep>>
}

const CheckoutContactForm: FC<StepProps> = ({ setStep }) => {
  //#region GENERAL
  const [order] = useLocalStorage<IOrder>('order', null)
  const [checkout, setCheckout] = useLocalStorage<ICheckout>('checkout', null)
  //#endregion

  //#region FORM
  const initialValues: TCheckoutContactSchema = {
    firstName: checkout?.customer_details?.first_name || '',
    lastName: checkout?.customer_details?.last_name || '',
    email: checkout?.customer_details?.email || '',
    phone: checkout?.customer_details?.phone || '',
  }

  const onSubmitForm = (
    values: TCheckoutContactSchema,
    actions: FormikHelpers<TCheckoutContactSchema>
  ) => {
    // if there is no cart
    if (!order || order.item_details.length === 0) {
      toast.dark('Please add a product to cart before proceeding to checkout')
      actions.setSubmitting(false) // finish formik cycle
      return
    }

    const { email, phone, firstName, lastName } = values

    const item_details = order.item_details.map((prod) => ({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      quantity: prod.quantity,
    }))

    const data = {
      item_details,
      user_id: order.user_id,
      customer_details: {
        email,
        phone,
        first_name: firstName,
        last_name: lastName,
        billing_address: {
          email,
          phone,
          first_name: firstName,
          last_name: lastName,
          address: '',
          city: '',
          postal_code: '',
          country_code: 'IDN',
        },
      },
    }

    setCheckout(data)
    setStep('shipping')
    actions.setSubmitting(false) // finish formik cycle
  }
  //#endregion

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutContactSchema}
      onSubmit={onSubmitForm}
    >
      {({ isSubmitting }) => (
        <Form className="mt-8">
          {/* First name + last name */}
          <div className="">
            <h4 className="text-sm font-medium text-gray-500">Full name</h4>

            <div className="mt-6 flex">
              <label htmlFor="firstName" className="block w-1/2">
                <Field
                  className="mt-1 block w-full text-gray-700"
                  placeholder="Your first name..."
                  type="text"
                  name="firstName"
                  autoFocus
                />

                <ErrorMessage
                  className="error-message"
                  name="firstName"
                  component="span"
                />
              </label>

              <label htmlFor="lastName" className="ml-3 block flex-1">
                <Field
                  className="mt-1 block w-full text-gray-700"
                  placeholder="Your last name..."
                  type="text"
                  name="lastName"
                />

                <ErrorMessage
                  className="error-message"
                  name="lastName"
                  component="span"
                />
              </label>
            </div>
          </div>

          {/* email */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-500">Email</h4>

            <div className="mt-6">
              <label htmlFor="email" className="block">
                <Field
                  className="mt-1 block w-full text-gray-700"
                  placeholder="Your email..."
                  type="email"
                  name="email"
                />

                <ErrorMessage
                  className="error-message"
                  name="email"
                  component="span"
                />
              </label>
            </div>
          </div>

          {/* phone */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-500">Phone number</h4>

            <div className="mt-6 flex">
              <label htmlFor="phone" className="block flex-1">
                <Field
                  className="mt-1 block w-full text-gray-700"
                  placeholder="082244449999"
                  name="phone"
                  type="tel"
                />

                <ErrorMessage
                  className="error-message"
                  name="phone"
                  component="span"
                />
              </label>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            {/* back btn invisible */}
            <button className="invisible items-center rounded text-sm font-medium text-gray-700 hover:bg-orange-200 focus:outline-none">
              <HiArrowNarrowLeft className="h-5 w-5" />
              <span className="mx-2">Back</span>
            </button>

            {/* forward btn */}
            <button
              className="flex items-center rounded bg-orange-800 px-3 py-2 text-sm font-medium text-white opacity-100 hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-500 disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Loading' : 'Shipping'}</span>
              <HiArrowNarrowRight className="mx-2 h-5 w-5" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CheckoutContactForm
