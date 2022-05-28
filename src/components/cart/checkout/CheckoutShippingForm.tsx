import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import useDebounce from 'hooks/useDebounce'
import useLocalStorage from 'hooks/useLocalStorage'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { httpGet } from 'services/http'
import { ICheckout } from 'types/LocalStorage'
import { checkoutShippingSchema, TCheckoutShippingSchema } from 'yup/schema'
import { StepProps } from './CheckoutContactForm'

const CheckoutShippingForm: FC<StepProps> = ({ setStep }) => {
  //#region GENERAL
  const [checkout] = useLocalStorage<ICheckout>('checkout', null) // setCheckout
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  // Debounce search term so that it only gives us latest value, if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing, so that we aren't hitting our API rapidly.
  // We pass generic type, this case string
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 1000)

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
  //#endregion

  //#region ACTION HANDLER
  const searchIndoAddress = async (search: string): Promise<any[]> => {
    try {
      const res = await httpGet(`https://kodepos.vercel.app/search?q=${search}`)

      const data = res.data.data
      return data as any[]
    } catch (err) {
      console.error(err)
      return []
    }
  }
  //#endregion

  //#region FORM
  const initialValues: TCheckoutShippingSchema = {
    address: checkout?.customer_details?.billing_address?.address || '',
    city: checkout?.customer_details?.billing_address?.city || '',
    postalCode: checkout?.customer_details?.billing_address?.postal_code || '',
  }

  async function onSubmitForm(
    values: TCheckoutShippingSchema,
    actions: FormikHelpers<TCheckoutShippingSchema>
  ): Promise<void> {
    try {
      // TODO: implement midtrans

      // success
      toast(values.city)
      toast.success('We will implement payment gateway soon')
      actions.setSubmitting(false) // finish formik cycle
    } catch (err) {
      toast.error(err.message)
      console.error(err)
      actions.setSubmitting(false) // finish formik cycle
    }
  }
  //#endregion

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutShippingSchema}
      onSubmit={onSubmitForm}
    >
      {({ isSubmitting, handleBlur, values, setValues }) => (
        <Form className="mt-8">
          {/* Address */}
          <div className="">
            <h4 className="text-sm font-medium text-gray-500">
              Delivery address
            </h4>

            <div className="mt-6 flex">
              <label htmlFor="address" className="block flex-1">
                <Field
                  className="mt-1 block w-full text-gray-700"
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

            <div className="mt-6 flex">
              <label htmlFor="postalcode" className="block w-1/4">
                <Field
                  className="mt-1 block w-full text-gray-700"
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
              <label htmlFor="city" className="ml-3 block flex-1">
                <input
                  className="mt-1 block w-full text-gray-700"
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

          <div className="mt-8 flex items-center justify-between">
            {/* back btn */}
            <button
              className="flex items-center rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-200 focus:outline-none focus:ring focus:ring-orange-500"
              onClick={() => setStep('contacts')}
              disabled={isSubmitting}
            >
              <HiArrowNarrowLeft className="h-5 w-5" />
              <span className="mx-2">{isSubmitting ? 'Loading' : 'Back'}</span>
            </button>

            {/* forward btn */}
            <button
              className="flex items-center rounded bg-orange-800 px-3 py-2 text-sm font-medium text-white opacity-100 hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-500 disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Loading' : 'Payments'}</span>
              <HiArrowNarrowRight className="mx-2 h-5 w-5" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CheckoutShippingForm
