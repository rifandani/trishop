import { Dispatch, SetStateAction } from 'react'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
// files
import useLocalStorage from 'hooks/useLocalStorage'
import { CheckoutStep } from './CheckoutComp'
import { TCheckoutContactSchema, checkoutContactSchema } from 'yup/schema'
import { IOrder, ICheckout } from 'types/LocalStorage'

export interface StepProps {
  setStep: Dispatch<SetStateAction<CheckoutStep>>
}

export default function CheckoutContactForm({ setStep }: StepProps) {
  // hooks
  const [order] = useLocalStorage<IOrder>('order', null)
  const [checkout, setCheckout] = useLocalStorage<ICheckout>('checkout', null)

  const initialValues: TCheckoutContactSchema = {
    firstName: checkout?.customer_details?.first_name || '',
    lastName: checkout?.customer_details?.last_name || '',
    email: checkout?.customer_details?.email || '',
    phone: checkout?.customer_details?.phone || '',
  }

  function onClickShipping(
    values: TCheckoutContactSchema,
    actions: FormikHelpers<TCheckoutContactSchema>
  ) {
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutContactSchema}
      onSubmit={onClickShipping}
    >
      {({ isSubmitting }) => (
        <Form className="mt-8">
          {/* First name + last name */}
          <div className="">
            <h4 className="text-sm font-medium text-gray-500">Full name</h4>

            <div className="flex mt-6">
              <label htmlFor="firstName" className="block w-1/2">
                <Field
                  className="block w-full mt-1 text-gray-700"
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

              <label htmlFor="lastName" className="flex-1 block ml-3">
                <Field
                  className="block w-full mt-1 text-gray-700"
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
                  className="block w-full mt-1 text-gray-700"
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

            <div className="flex mt-6">
              <label htmlFor="phone" className="flex-1 block">
                <Field
                  className="block w-full mt-1 text-gray-700"
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

          <div className="flex items-center justify-between mt-8">
            {/* back btn invisible */}
            <button className="items-center invisible text-sm font-medium text-gray-700 rounded hover:bg-orange-200 focus:outline-none">
              <HiArrowNarrowLeft className="w-5 h-5" />
              <span className="mx-2">Back</span>
            </button>

            {/* forward btn */}
            <button
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-800 rounded opacity-100 disabled:opacity-50 hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-500"
              type="submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Loading' : 'Shipping'}</span>
              <HiArrowNarrowRight className="w-5 h-5 mx-2" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
