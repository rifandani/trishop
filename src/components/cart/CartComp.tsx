import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { IoMdClose, IoIosCard } from 'react-icons/io'
import { RiCoupon2Fill, RiDeleteBin6Line } from 'react-icons/ri'
import { Transition } from '@headlessui/react'
import { toast } from 'react-toastify'
// files
import useLocalStorage from 'hooks/useLocalStorage'
import generateRupiah from 'utils/generateRupiah'
import { APIResponseCoupon } from 'types/Coupon'
import { IOrder } from 'types/LocalStorage'
import { UserPayload } from 'contexts/UserReducer'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { deleteProductFromCart } from 'redux/slices/cart'

export default function CartComp(): JSX.Element {
  // hooks
  const { push } = useRouter()

  const cart = useAppSelector((state) => state.cart) // redux -> cart
  const dispatch = useAppDispatch()

  const [, setOrder] = useLocalStorage<IOrder>('order', null) // local storage
  const [user] = useLocalStorage<UserPayload>('user', null) // local storage

  const [busy, setBusy] = useState<boolean>(false)
  const [coupon, setCoupon] = useState<string>('')
  const [couponDiscount, setCouponDiscount] = useState<number>(0) // float || number
  const [subtotal, setSubtotal] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    // count subtotal
    const mySubtotal = cart.values.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    )
    setSubtotal(mySubtotal)

    // count total price
    const priceAfterDiscount =
      couponDiscount < 1
        ? Math.floor(mySubtotal * couponDiscount)
        : Math.floor(mySubtotal - couponDiscount)
    setTotal(mySubtotal - priceAfterDiscount)
  }, [cart, couponDiscount])

  function deleteProduct(productId: string): void {
    dispatch(deleteProductFromCart(productId))

    toast.info('Product deleted from the cart')
  }

  async function applyCoupon(): Promise<void> {
    const reqBody = {
      userId: user._id, // user _id
      code: coupon,
    }

    try {
      setBusy(true)

      const res = await axios.post<APIResponseCoupon>(
        '/public/validate/coupon',
        reqBody
      )

      // if there client error
      if (res.status !== 201) {
        toast.error(res.data.message)
        return
      }

      // set value coupon
      const coupon = res.data.coupon
      setCouponDiscount(coupon.discount) // float || number

      // success
      toast.success('Coupon applied')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  function deleteCoupon(): void {
    // reset all coupon
    setCoupon('')
    setCouponDiscount(0)

    toast('Coupon reset')
  }

  async function checkout(): Promise<void> {
    // if there is no cart
    if (cart.count === 0) {
      toast.dark('Please add a product to cart before proceeding to checkout')
      return
    }

    const item_details = cart.values.map((prod) => ({
      id: prod._id,
      name: prod.title,
      price: prod.price,
      quantity: prod.quantity,
      imageName: prod.images[0].imageName,
      imageUrl: prod.images[0].imageUrl,
    }))

    const order = {
      user_id: user._id, // user _id
      transaction_details: {
        gross_amount: total,
      },
      item_details,
    }

    try {
      setOrder(order) // set order to local storage
      await push('/cart/checkout')
    } catch (err) {
      toast.error(err.message)
      console.error(err)
    }
  }

  return (
    <main className="min-h-screen py-20 bg-white lg:pt-28 lg:mt-3">
      <div className="container flex flex-col items-center justify-center px-4 pt-2 pb-8 mx-auto sm:px-6 lg:px-8">
        {/* title */}
        <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold leading-tight tracking-widest text-orange-800 uppercase bg-orange-200 rounded-full">
          Get the best from us
        </p>

        <h1 className="flex justify-center mb-12 font-sans text-3xl font-bold leading-none tracking-tight text-center text-gray-900 b-6 sm:text-4xl md:mx-auto">
          <FaShoppingCart className="w-8 h-8 mr-3 text-orange-800" />
          <span className="relative">Your Cart</span>{' '}
        </h1>

        {/* main content */}
        <section className="flex w-full">
          <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg">
            <article className="flex-1">
              {/* product table */}
              <table className="w-full text-sm lg:text-base" cellSpacing={0}>
                <thead>
                  <tr className="h-12 uppercase">
                    <th className="hidden md:table-cell"></th>
                    <th className="text-left ">Product</th>
                    <th className="pl-5 text-right lg:pl-0">
                      <span className="lg:hidden" title="Quantity">
                        Qtd
                      </span>
                      <span className="hidden lg:inline ">Quantity</span>
                    </th>
                    <th className="hidden text-right md:table-cell">
                      Unit price
                    </th>
                    <th className="text-right text-orange-800">Total price</th>
                  </tr>
                </thead>

                {/* isi product */}
                <tbody>
                  {cart.count > 0 &&
                    cart.values.map((prod) => (
                      <Transition
                        key={prod._id}
                        as="tr"
                        show={!!cart.count}
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
                            src={prod.images[0].imageUrl}
                            alt={prod.images[0].imageName}
                          />
                        </td>
                        <td>
                          <p className="flex items-end justify-between mb-2">
                            {prod.title}
                            <span onClick={() => deleteProduct(prod._id)}>
                              <IoMdClose className="mr-3 text-red-500 transition duration-500 transform cursor-pointer hover:scale-150" />
                            </span>
                          </p>
                        </td>
                        <td className="text-right">
                          <span className="text-sm font-medium lg:text-base">
                            {prod.quantity}
                          </span>
                        </td>
                        <td className="hidden text-right md:table-cell">
                          <span className="text-sm font-medium lg:text-base">
                            {generateRupiah(prod.price)}
                          </span>
                        </td>
                        <td className="text-right">
                          <span className="text-sm font-medium text-orange-800 lg:text-base">
                            {generateRupiah(prod.price * prod.quantity)}
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
                  <div className="p-4 bg-orange-200 rounded-full">
                    <h1 className="ml-2 font-bold text-orange-800 uppercase">
                      Coupon Code
                    </h1>
                  </div>

                  <div className="p-4">
                    <p className="mb-4 italic font-thin text-gray-500">
                      If you have a coupon code, please enter it in the box
                      below
                    </p>
                    <div className="justify-center md:flex">
                      <div className="flex items-center w-full pl-3 bg-gray-100 border rounded-full h-13">
                        <input
                          className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none focus:border-blue-500 border-1"
                          placeholder="Your coupon code here..."
                          onChange={(e) => setCoupon(e.target.value)}
                          value={coupon}
                        />

                        <button
                          className="flex items-center px-3 py-1 text-sm text-white bg-orange-800 rounded-full outline-none md:px-4 hover:bg-orange-500 focus:outline-none active:outline-none"
                          onClick={applyCoupon}
                          disabled={busy}
                        >
                          <RiCoupon2Fill className="w-8 text-lg" />
                          <span className="font-medium">
                            {busy ? 'Loading...' : 'Apply'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TODO: add seller instruction to ORDER */}
                  <div className="p-4 mt-6 bg-orange-200 rounded-full">
                    <h1 className="ml-2 font-bold text-orange-800 uppercase">
                      Instruction for seller
                    </h1>
                  </div>
                  <div className="p-4">
                    <p className="mb-4 italic font-thin text-gray-500">
                      If you have some information for the seller you can leave
                      them in the box below
                    </p>
                    <textarea className="w-full h-24 p-2 bg-gray-100 rounded"></textarea>
                  </div>
                </div>

                {/* order details */}
                <div className="lg:px-2 lg:w-1/2">
                  <div className="p-4 bg-orange-200 rounded-full">
                    <h1 className="ml-2 font-bold text-orange-800 uppercase">
                      Order Details
                    </h1>
                  </div>
                  <div className="p-4">
                    <p className="mb-6 italic font-thin text-gray-500">
                      Shipping and additionnal costs are calculated based on
                      values you have entered
                    </p>

                    <div className="flex justify-between border-b">
                      <div className="m-2 text-lg font-bold text-center text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                        Subtotal
                      </div>
                      <div className="m-2 font-bold text-center text-gray-900 lg:px-4 lg:py-2 lg:text-lg">
                        {generateRupiah(subtotal)}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-b">
                      <div className="flex items-center m-2 text-lg font-bold text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                        <RiDeleteBin6Line
                          onClick={deleteCoupon}
                          className="w-4 mr-2 text-red-600 transition duration-500 transform cursor-pointer hover:scale-125"
                        />
                        <span>Coupon &quot;{coupon}&quot;</span>
                      </div>
                      <div className="m-2 font-bold text-center text-red-500 lg:px-4 lg:py-2 lg:text-lg">
                        -{' '}
                        {generateRupiah(
                          couponDiscount < 1
                            ? Math.floor(subtotal * couponDiscount)
                            : Math.floor(subtotal - couponDiscount)
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-b">
                      <div className="m-2 text-lg font-bold text-center lg:px-4 lg:py-2 lg:text-xl">
                        Total
                      </div>
                      <div className="m-2 font-bold text-center text-orange-800 lg:px-4 lg:py-2 lg:text-lg">
                        {generateRupiah(total)}
                      </div>
                    </div>

                    {/* checkout button */}
                    <button
                      onClick={checkout}
                      className="flex items-center justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-orange-800 rounded-full shadow item-center hover:bg-orange-500 focus:shadow-outline focus:outline-none"
                    >
                      <IoIosCard className="text-lg" />
                      <span className="ml-2">Proceed to checkout</span>
                    </button>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}
