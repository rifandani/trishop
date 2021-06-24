import { useState } from 'react'
// files
import CheckoutContactForm from './CheckoutContactForm'
import CheckoutShippingForm from './CheckoutShippingForm'
import CheckoutProduct from './CheckoutProduct'
import useLocalStorage from 'hooks/useLocalStorage'
import { IOrder } from 'types/LocalStorage'
// import generateRupiah from 'utils/generateRupiah'

export type CheckoutStep = 'contacts' | 'shipping'

function CheckoutComp(): JSX.Element {
  // hooks
  const [order] = useLocalStorage<IOrder>('order', null)
  const [step, setStep] = useState<CheckoutStep>('contacts')

  return (
    <main className="my-8 bg-white">
      <div className="container px-6 mx-auto">
        <h3 className="text-2xl font-medium text-gray-700">Checkout</h3>

        <div className="flex flex-col mt-8 lg:flex-row">
          <div className="order-2 w-full lg:w-1/2">
            {/* steps timeline */}
            <section className="flex items-center">
              <div
                className={
                  step === 'contacts'
                    ? 'checkout__step-div-active'
                    : 'checkout__step-div-inactive'
                }
              >
                <span
                  className={
                    step === 'contacts'
                      ? 'checkout__step-span-active'
                      : 'checkout__step-span-inactive'
                  }
                >
                  1
                </span>{' '}
                Contacts
              </div>

              <div
                className={
                  step === 'shipping'
                    ? 'checkout__step-div-active ml-8'
                    : 'checkout__step-div-inactive ml-8'
                }
              >
                <span
                  className={
                    step === 'shipping'
                      ? 'checkout__step-span-active'
                      : 'checkout__step-span-inactive'
                  }
                >
                  2
                </span>{' '}
                Shipping
              </div>
            </section>

            {/* START FORM */}
            {step === 'contacts' ? (
              <CheckoutContactForm setStep={setStep} />
            ) : (
              <CheckoutShippingForm setStep={setStep} />
            )}
            {/* END FORM */}
          </div>

          {/* aside products */}
          <div className="flex-shrink-0 order-1 w-full mb-8 lg:w-1/2 lg:mb-0 lg:order-2">
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md px-4 py-3 border rounded-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">Order</h3>

                  {/* <h3 className="font-medium text-gray-700">
                    Total:{' '}
                    <span className="text-orange-800">
                      {order
                        ? generateRupiah(order.transaction_details.gross_amount)
                        : generateRupiah(0)}
                    </span>
                  </h3> */}
                </div>

                {/* order product list */}
                {order ? (
                  order.item_details.map((product) => (
                    <CheckoutProduct key={product.id} product={product} />
                  ))
                ) : (
                  <h3 className="mt-2 font-medium text-orange-800">
                    No Product
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CheckoutComp
