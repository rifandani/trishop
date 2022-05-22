import { UserPayload } from 'contexts/UserReducer'
import useLocalStorage from 'hooks/useLocalStorage'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { IoIosCard, IoMdClose } from 'react-icons/io'
import { RiCoupon2Fill, RiDeleteBin6Line } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { deleteProductFromCart } from 'redux/slices/cart'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { httpPost } from 'services/http'
import { APIResponseCoupon } from 'types/Coupon'
import { IOrder } from 'types/LocalStorage'
import generateRupiah from 'utils/generateRupiah'

const CartComp: FC = () => {
  //#region GENERAL
  const { push } = useRouter()
  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const [, setOrder] = useLocalStorage<IOrder>('order', null)
  const [user] = useLocalStorage<UserPayload>('user', null)

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
  //#endregion

  //#region ACTION HANDLER
  const deleteProduct = (productId: string): void => {
    dispatch(deleteProductFromCart(productId))

    toast.info('Product deleted from the cart')
  }

  const applyCoupon = async (): Promise<void> => {
    const reqBody = {
      userId: user._id, // user _id
      code: coupon,
    }

    try {
      setBusy(true)

      const res = await httpPost<APIResponseCoupon>(
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
    } finally {
      setBusy(false)
    }
  }

  const deleteCoupon = (): void => {
    // reset all coupon
    setCoupon('')
    setCouponDiscount(0)

    toast('Coupon reset')
  }

  const checkout = async (): Promise<void> => {
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
  //#endregion

  return (
    <main className="min-h-screen bg-white py-20 lg:mt-3 lg:pt-28">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 pt-2 pb-8 sm:px-6 lg:px-8">
        {/* title */}
        <p className="mb-4 inline-block rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold uppercase leading-tight tracking-widest text-orange-800">
          Get the best from us
        </p>

        <h1 className="b-6 mb-12 flex justify-center text-center font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <FaShoppingCart className="mr-3 h-8 w-8 text-orange-800" />
          <span className="relative">Your Cart</span>{' '}
        </h1>

        {/* main content */}
        <section className="flex w-full">
          <div className="flex w-full flex-col bg-white p-8 text-gray-800 shadow-lg">
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
                      <tr key={prod._id} className="mb-10">
                        <td className="relative hidden h-10 w-10 pb-4 md:table-cell">
                          <Image
                            src={prod.images[0].imageUrl}
                            alt={prod.images[0].imageName}
                            className="rounded-xl"
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                            priority
                          />
                        </td>
                        <td>
                          <p className="mb-2 flex items-end justify-between">
                            {prod.title}
                            <span onClick={() => deleteProduct(prod._id)}>
                              <IoMdClose className="mr-3 transform cursor-pointer text-red-500 transition duration-500 hover:scale-150" />
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
                      </tr>
                    ))}
                </tbody>
              </table>

              <hr className="mt-6 pb-6" />

              <section className="my-4 -mx-2 mt-6 lg:flex">
                <div className="lg:w-1/2 lg:px-2">
                  {/* coupon */}
                  <div className="rounded-full bg-orange-200 p-4">
                    <h1 className="ml-2 font-bold uppercase text-orange-800">
                      Coupon Code
                    </h1>
                  </div>

                  <div className="p-4">
                    <p className="mb-4 font-thin italic text-gray-500">
                      If you have a coupon code, please enter it in the box
                      below
                    </p>
                    <div className="justify-center md:flex">
                      <div className="h-13 flex w-full items-center rounded-full border bg-gray-100 pl-3">
                        <input
                          className="border-1 w-full appearance-none bg-gray-100 outline-none focus:border-blue-500 focus:outline-none active:outline-none"
                          placeholder="Your coupon code here..."
                          onChange={(e) => setCoupon(e.target.value)}
                          value={coupon}
                        />

                        <button
                          className="flex items-center rounded-full bg-orange-800 px-3 py-1 text-sm text-white outline-none hover:bg-orange-500 focus:outline-none active:outline-none md:px-4"
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
                  <div className="mt-6 rounded-full bg-orange-200 p-4">
                    <h1 className="ml-2 font-bold uppercase text-orange-800">
                      Instruction for seller
                    </h1>
                  </div>
                  <div className="p-4">
                    <p className="mb-4 font-thin italic text-gray-500">
                      If you have some information for the seller you can leave
                      them in the box below
                    </p>
                    <textarea className="h-24 w-full rounded bg-gray-100 p-2"></textarea>
                  </div>
                </div>

                {/* order details */}
                <div className="lg:w-1/2 lg:px-2">
                  <div className="rounded-full bg-orange-200 p-4">
                    <h1 className="ml-2 font-bold uppercase text-orange-800">
                      Order Details
                    </h1>
                  </div>
                  <div className="p-4">
                    <p className="mb-6 font-thin italic text-gray-500">
                      Shipping and additionnal costs are calculated based on
                      values you have entered
                    </p>

                    <div className="flex justify-between border-b">
                      <div className="m-2 text-center text-lg font-bold text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                        Subtotal
                      </div>
                      <div className="m-2 text-center font-bold text-gray-900 lg:px-4 lg:py-2 lg:text-lg">
                        {generateRupiah(subtotal)}
                      </div>
                    </div>

                    <div className="flex justify-between border-b pt-4">
                      <div className="m-2 flex items-center text-lg font-bold text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                        <RiDeleteBin6Line
                          onClick={deleteCoupon}
                          className="mr-2 w-4 transform cursor-pointer text-red-600 transition duration-500 hover:scale-125"
                        />
                        <span>Coupon &quot;{coupon}&quot;</span>
                      </div>
                      <div className="m-2 text-center font-bold text-red-500 lg:px-4 lg:py-2 lg:text-lg">
                        -{' '}
                        {generateRupiah(
                          couponDiscount < 1
                            ? Math.floor(subtotal * couponDiscount)
                            : Math.floor(subtotal - couponDiscount)
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between border-b pt-4">
                      <div className="m-2 text-center text-lg font-bold lg:px-4 lg:py-2 lg:text-xl">
                        Total
                      </div>
                      <div className="m-2 text-center font-bold text-orange-800 lg:px-4 lg:py-2 lg:text-lg">
                        {generateRupiah(total)}
                      </div>
                    </div>

                    {/* checkout button */}
                    <button
                      onClick={checkout}
                      className="item-center focus:shadow-outline mt-6 flex w-full items-center justify-center rounded-full bg-orange-800 px-10 py-3 font-medium uppercase text-white shadow hover:bg-orange-500 focus:outline-none"
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

export default CartComp
