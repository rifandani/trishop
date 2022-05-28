import useLocalStorage from 'hooks/useLocalStorage'
import { FC, useState } from 'react'
import { IOrder } from 'types/LocalStorage'
import CheckoutContactForm from './CheckoutContactForm'
import CheckoutProduct from './CheckoutProduct'
import CheckoutShippingForm from './CheckoutShippingForm'

export type CheckoutStep = 'contacts' | 'shipping'

const CheckoutComp: FC = () => {
  //#region GENERAL
  const [order] = useLocalStorage<IOrder>('order', null)
  const [step, setStep] = useState<CheckoutStep>('contacts')
  //#endregion

  return (
    <main className="my-8 bg-white">
      <div className="container mx-auto px-6">
        <h3 className="text-2xl font-medium text-gray-700">Checkout</h3>

        <div className="mt-8 flex flex-col lg:flex-row">
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
          <div className="order-1 mb-8 w-full flex-shrink-0 lg:order-2 lg:mb-0 lg:w-1/2">
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-md border px-4 py-3">
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
