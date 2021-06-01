import { useRouter } from 'next/router'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
// files
import { StepProps } from './CheckoutContactForm'

export default function CheckoutShippingForm({ setStep }: StepProps) {
  const { push } = useRouter()

  async function onCheckout() {
    try {
      // validate auth cookie
      const authCookieStr = Cookies.get('auth') // get authCookie string
      if (!authCookieStr) {
        await push('/login')
        toast.warning(
          'Please login first before checkout so you can track your order status'
        )
        return
      }
    } catch (err) {
      toast.error(err.message)
      console.error(err)
    }
  }

  return (
    <form className="mt-8">
      {/* First name + last name */}
      <div className="">
        <h4 className="text-sm font-medium text-gray-500">Full name</h4>

        <div className="flex mt-6">
          <label htmlFor="firstName" className="block w-1/2">
            <input
              className="block w-full mt-1 text-gray-700"
              placeholder="Your first name..."
              type="text"
            />
          </label>

          <label htmlFor="lastName" className="flex-1 block ml-3">
            <input
              className="block w-full mt-1 text-gray-700"
              placeholder="Your last name..."
              type="text"
            />
          </label>
        </div>
      </div>

      {/* email */}
      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-500">Email</h4>

        <div className="mt-6">
          <button className="flex items-center justify-between w-full p-4 bg-white border-2 border-orange-500 rounded-md focus:outline-none">
            <label htmlFor="radio" className="flex items-center">
              <input
                type="radio"
                className="w-5 h-5 text-orange-500 form-radio"
              />
              <span className="ml-2 text-sm text-gray-700">MS Delivery</span>
            </label>

            <span className="text-sm text-gray-600">$18</span>
          </button>

          <button className="flex items-center justify-between w-full p-4 mt-6 bg-white border rounded-md focus:outline-none">
            <label htmlFor="radio" className="flex items-center">
              <input
                type="radio"
                className="w-5 h-5 text-orange-500 form-radio"
              />
              <span className="ml-2 text-sm text-gray-700">DC Delivery</span>
            </label>

            <span className="text-sm text-gray-600">$26</span>
          </button>
        </div>
      </div>

      {/* phone */}
      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-500">Phone number</h4>

        <div className="flex mt-6">
          <label htmlFor="date" className="flex-1 block">
            <input
              type="date"
              className="block w-full mt-1 text-gray-700"
              placeholder="Date"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        {/* back btn */}
        <button
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded hover:bg-orange-200 focus:ring focus:ring-orange-500 focus:outline-none"
          onClick={() => setStep('contacts')}
        >
          <HiArrowNarrowLeft className="w-5 h-5" />
          <span className="mx-2">Back</span>
        </button>

        {/* forward btn */}
        <button
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-800 rounded hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-500"
          onClick={() => {}}
        >
          <span>Payments</span>
          <HiArrowNarrowRight className="w-5 h-5 mx-2" />
        </button>
      </div>
    </form>
  )
}
