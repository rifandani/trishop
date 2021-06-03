import { ChangeEvent, useEffect, useState } from 'react'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
// files
import { StepProps } from './CheckoutContactForm'
import useDebounce from 'hooks/useDebounce'
import useLocalStorage from 'hooks/useLocalStorage'
import { ICheckout } from 'types/OrderLS'
import { checkoutShippingSchema, TCheckoutShippingSchema } from 'yup/schema'

export default function CheckoutShippingForm({ setStep }: StepProps) {
  // hooks
  const [checkout, setCheckout] = useLocalStorage<ICheckout>('checkout', null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  // Debounce search term so that it only gives us latest value, if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing, so that we aren't hitting our API rapidly.
  // We pass generic type, this case string
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 1000)

  const initialValues: TCheckoutShippingSchema = {
    address: checkout?.customer_details?.billing_address?.address || '',
    city: checkout?.customer_details?.billing_address?.city || '',
    postalCode: checkout?.customer_details?.billing_address?.postal_code || '',
  }

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true)
        searchIndoAddress(debouncedSearchTerm).then((results) => {
          setIsSearching(false)
          setResults(results)
        })
      } else {
        setResults([])
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  )

  // API search function
  async function searchIndoAddress(search: string): Promise<any[]> {
    try {
      const res = await Axios.get(
        `https://kodepos.vercel.app/search?q=${search}`
      )

      const data = res.data.data
      return data as any[]
    } catch (err) {
      console.error(err)
      return []
    }
  }

  // TODO: implement midtrans
  async function onCheckout(
    values: TCheckoutShippingSchema,
    actions: FormikHelpers<TCheckoutShippingSchema>
  ): Promise<void> {
    try {
      console.log('values => ', values)
      actions.setSubmitting(false) // finish formik cycle
    } catch (err) {
      toast.error(err.message)
      console.error(err)
      actions.setSubmitting(false) // finish formik cycle
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutShippingSchema}
      onSubmit={onCheckout}
    >
      {({ isSubmitting, handleBlur, values, setValues }) => (
        <Form className="mt-8">
          {/* Address */}
          <div className="">
            <h4 className="text-sm font-medium text-gray-500">
              Delivery address
            </h4>

            <div className="flex mt-6">
              <label htmlFor="address" className="flex-1 block">
                <Field
                  className="block w-full mt-1 text-gray-700"
                  placeholder="Jalan Gejayan Gang Sambu RT 5 RW 3..."
                  name="address"
                  type="text"
                  as="textarea"
                  rows="3"
                  autoFocus
                />

                <ErrorMessage
                  className="error-message"
                  name="address"
                  component="span"
                />
              </label>
            </div>
          </div>

          {/* postal code + city */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-500">
              City and postal code
            </h4>

            <div className="flex mt-6">
              <label htmlFor="postalcode" className="block w-1/4">
                <Field
                  className="block w-full mt-1 text-gray-700"
                  placeholder={values.postalCode || 'Postal code'}
                  name="postalcode"
                  type="text"
                  disabled
                />

                <ErrorMessage
                  className="error-message"
                  name="postalcode"
                  component="span"
                />
              </label>

              {/* input debounce */}
              <label htmlFor="city" className="flex-1 block ml-3">
                <input
                  className="block w-full mt-1 text-gray-700"
                  placeholder="Yogyakarta"
                  name="city"
                  id="city"
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(e.target.value)
                    setValues({ ...values, city: e.target.value })
                  }}
                  onBlur={handleBlur}
                  value={values.city}
                />

                {isSearching ? (
                  <div className="city-list">Searching ...</div>
                ) : null}

                {results
                  ? results.map((el, i) => (
                      <button
                        key={i}
                        className="city-list hover:bg-orange-200"
                        onClick={() => {
                          setValues({
                            ...values,
                            city: el.city,
                            postalCode: el.postalcode,
                          })
                          setIsSearching(false)
                          setResults([])
                          setSearchTerm('')
                        }}
                      >
                        {el.urban}, {el.subdistrict}, {el.city}, {el.province},{' '}
                        {el.postalcode}
                      </button>
                    ))
                  : null}

                <ErrorMessage
                  className="error-message"
                  name="city"
                  component="span"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            {/* back btn */}
            <button
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded hover:bg-orange-200 focus:ring focus:ring-orange-500 focus:outline-none"
              onClick={() => setStep('contacts')}
              disabled={isSubmitting}
            >
              <HiArrowNarrowLeft className="w-5 h-5" />
              <span className="mx-2">{isSubmitting ? 'Loading' : 'Back'}</span>
            </button>

            {/* forward btn */}
            <button
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-800 rounded opacity-100 disabled:opacity-50 hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-500"
              type="submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Loading' : 'Payments'}</span>
              <HiArrowNarrowRight className="w-5 h-5 mx-2" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
