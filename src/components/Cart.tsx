import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { IoMdClose, IoIosCard } from 'react-icons/io'
import { RiCoupon2Fill, RiDeleteBin6Line } from 'react-icons/ri'
import { Transition } from '@headlessui/react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import Axios from 'axios'
// files
import { CartContext } from '../contexts/CartContext'
import { Payload } from '../contexts/CartReducer'

export default function Cart() {
  // hooks
  const { push } = useRouter()
  const { cart, dispatch } = useContext(CartContext) // cart context
  const [coupon, setCoupon] = useState<string>('')
  const [couponDiscount, setCouponDiscount] = useState<number>(0) // float
  const [subtotal, setSubtotal] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const mySubtotal = (cart as Payload[]).reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    )
    setSubtotal(mySubtotal)

    const priceAfterDiscount = Math.floor(mySubtotal * couponDiscount)

    setTotal(mySubtotal - priceAfterDiscount)
  }, [cart, couponDiscount])

  function deleteProduct(product: Payload) {
    dispatch({
      type: 'DEL_PRODUCT',
      payload: product,
    })
  }

  function onChangeQuantity() {
    // kalau ingin functionality ini, maka harus Call API untuk product tersebut, lalu ngecek jangan sampai quantity nya melebihi dari yg ada di database
    toast.warning(
      'You cant change the quantity here. Please, delete the product in the cart first.'
    )
  }

  async function applyCoupon() {
    const couponData = {
      coupon: coupon.toLowerCase(),
    }

    // call coupon API
    const res = await Axios.post('/coupon', couponData)

    // kalau error, return toast
    if (res?.data.error) {
      return toast.error(res?.data.message)
    }

    // set value coupon
    const discountValue = res?.data.discount
    setCouponDiscount(discountValue) // float

    toast.success('Coupon applied')
  }

  function deleteCoupon() {
    // reset all coupon
    setCoupon('')
    setCouponDiscount(0)

    toast.info('Coupon reset')
  }

  async function checkout() {
    const authCookie = Cookies.get('auth')

    if (!authCookie) {
      await push('/login')
      return toast.warning('Please login first to proceed to checkout')
    } else if (cart.length === 0) {
      return toast.dark(
        'Please add a product to cart before proceeding to checkout'
      )
    }

    await push('/cart/checkout')
  }

  return (
    <div className="flex justify-center mt-16 mb-0 md:mb-10 md:mt-20 lg:mt-24">
      <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg md:w-4/5 lg:w-4/5">
        <article className="flex-1">
          {/* product table */}
          <table className="w-full text-sm lg:text-base" cellSpacing={0}>
            <thead>
              <tr className="h-12 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left ">Product</th>
                <th className="pl-5 text-left md:text-center lg:text-right lg:pl-0">
                  <span className="lg:hidden" title="Quantity">
                    Qtd
                  </span>
                  <span className="hidden lg:inline ">Quantity</span>
                </th>
                <th className="hidden text-right md:table-cell">Unit price</th>
                <th className="text-right text-red-600">Total price</th>
              </tr>
            </thead>

            {/* isi product */}
            <tbody>
              {cart &&
                (cart as Payload[]).map((product) => (
                  <Transition
                    key={product._id}
                    as="tr"
                    show={Boolean(cart)}
                    className="transition duration-500 ease-in-out"
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <td className="hidden pb-4 md:table-cell">
                      <img
                        className="w-20 rounded"
                        src={product.images[0].imageUrl}
                        alt={product.images[0].imageName}
                      />
                    </td>
                    <td>
                      <p className="flex items-end justify-between mb-2">
                        {product.title}
                        <span onClick={() => deleteProduct(product)}>
                          <IoMdClose className="mr-3 text-red-500 transition duration-500 transform cursor-pointer hover:scale-150" />
                        </span>
                      </p>
                    </td>
                    <td className="items-center justify-center md:justify-end md:flex">
                      <input
                        className="flex w-16 h-10 font-semibold text-center text-gray-700 bg-gray-200 outline-none md:mt-3 focus:outline-none hover:text-black focus:text-black"
                        type="number"
                        onChange={() => onChangeQuantity()}
                        value={product.quantity.toString()}
                      />
                    </td>
                    <td className="hidden text-right md:table-cell">
                      <span className="text-sm font-medium lg:text-base">
                        Rp {product.price}
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="text-sm font-medium lg:text-base">
                        Rp {product.price * product.quantity}
                      </span>
                    </td>
                  </Transition>
                  // <tr
                  //   key={product._id}
                  //   className="transition duration-500 ease-in-out"
                  // >
                  // </tr>
                ))}
            </tbody>
          </table>

          <hr className="pb-6 mt-6" />

          <section className="my-4 mt-6 -mx-2 lg:flex">
            <div className="lg:px-2 lg:w-1/2">
              {/* coupon */}
              <div className="p-4 bg-gray-100 rounded-full">
                <h1 className="ml-2 font-bold uppercase">Coupon Code</h1>
              </div>

              <div className="p-4">
                <p className="mb-4 italic">
                  If you have a coupon code, please enter it in the box below
                </p>
                <div className="justify-center md:flex">
                  <div className="flex items-center w-full pl-3 bg-gray-100 border rounded-full h-13">
                    <input
                      className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none focus:border-blue-500 border-1"
                      placeholder="Apply coupon"
                      onChange={(e) => setCoupon(e.target.value)}
                      value={coupon}
                    />

                    <button
                      onClick={applyCoupon}
                      className="flex items-center px-3 py-1 text-sm text-white bg-orange-800 rounded-full outline-none md:px-4 hover:opacity-50 focus:outline-none active:outline-none"
                    >
                      <RiCoupon2Fill className="w-8 text-lg" />
                      <span className="font-medium">Apply</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* seller instruction */}
              <div className="p-4 mt-6 bg-gray-100 rounded-full">
                <h1 className="ml-2 font-bold uppercase">
                  Instruction for seller
                </h1>
              </div>
              <div className="p-4">
                <p className="mb-4 italic">
                  If you have some information for the seller you can leave them
                  in the box below
                </p>
                <textarea className="w-full h-24 p-2 bg-gray-100 rounded"></textarea>
              </div>
            </div>

            {/* order details */}
            <div className="lg:px-2 lg:w-1/2">
              <div className="p-4 bg-gray-100 rounded-full">
                <h1 className="ml-2 font-bold uppercase">Order Details</h1>
              </div>
              <div className="p-4">
                <p className="mb-6 italic">
                  Shipping and additionnal costs are calculated based on values
                  you have entered
                </p>

                <div className="flex justify-between border-b">
                  <div className="m-2 text-lg font-bold text-center text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                    Subtotal
                  </div>
                  <div className="m-2 font-bold text-center text-gray-900 lg:px-4 lg:py-2 lg:text-lg">
                    Rp {subtotal}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-b">
                  <div className="flex items-center m-2 text-lg font-bold text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                    <RiDeleteBin6Line
                      onClick={deleteCoupon}
                      className="w-4 mr-2 text-red-600 transition duration-500 transform cursor-pointer hover:scale-125"
                    />
                    <span>Coupon "{coupon}"</span>
                  </div>
                  <div className="m-2 font-bold text-center text-green-500 lg:px-4 lg:py-2 lg:text-lg">
                    - Rp {Math.floor(subtotal * couponDiscount)}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-b">
                  <div className="m-2 text-lg font-bold text-center lg:px-4 lg:py-2 lg:text-xl">
                    Total
                  </div>
                  <div className="m-2 font-bold text-center text-red-600 lg:px-4 lg:py-2 lg:text-lg">
                    Rp {total}
                  </div>
                </div>

                {/* checkout button */}
                <button
                  onClick={checkout}
                  className="flex items-center justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-orange-800 rounded-full shadow item-center hover:opacity-50 focus:shadow-outline focus:outline-none"
                >
                  <IoIosCard className="text-lg" />
                  <span className="ml-2">Proceed to checkout</span>
                </button>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  )
}
