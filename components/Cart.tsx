import { useContext } from 'react';
import { IoMdClose, IoIosCard } from 'react-icons/io';
import { RiCoupon2Fill, RiDeleteBin6Line } from 'react-icons/ri';
// files
import { CartContext } from '../contexts/CartContext';
import { Payload } from '../contexts/CartReducer';

export default function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  function deleteProduct(product: Payload) {
    dispatch({
      type: 'DEL_PRODUCT',
      payload: product,
    });
  }

  return (
    <div className="flex justify-center mb-0 mt-16 md:mb-10 md:mt-20 lg:mt-24">
      <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg md:w-4/5 lg:w-4/5">
        <article className="flex-1">
          {/* product table */}
          <table className="w-full text-sm lg:text-base" cellSpacing={0}>
            <thead>
              <tr className="h-12 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left ">Product</th>
                <th className="md:text-center lg:text-right text-left pl-5 lg:pl-0">
                  <span className="lg:hidden" title="Quantity">
                    Qtd
                  </span>
                  <span className="hidden lg:inline ">Quantity</span>
                </th>
                <th className="hidden text-right  md:table-cell">Unit price</th>
                <th className="text-right text-red-600">Total price</th>
              </tr>
            </thead>

            {/* isi product */}
            <tbody>
              {/* gatau kenapa squigly di .map nya */}
              {cart &&
                (cart as any[]).map((product: Payload) => (
                  <tr
                    key={product._id}
                    className="transition duration-500 ease-in-out"
                  >
                    <td className="hidden pb-4 md:table-cell">
                      <img
                        className="w-20 rounded"
                        src={product.images[0].imageUrl}
                        alt={product.images[0].imageName}
                      />
                    </td>
                    <td>
                      <p className="flex items-center justify-between mb-2">
                        {product.title}
                        <span onClick={() => deleteProduct(product)}>
                          <IoMdClose className="mr-3 transform hover:scale-150 transition duration-500 cursor-pointer text-red-500" />
                        </span>
                      </p>
                    </td>
                    <td className="justify-center md:justify-end md:flex mt-3">
                      <div className="w-20 h-10">
                        <div className="relative flex flex-row w-full h-8">
                          <input
                            className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                            type="number"
                            onChange={() => {}}
                            value={product.quantity.toString()}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="hidden text-right md:table-cell">
                      <span className="text-sm lg:text-base font-medium">
                        Rp {product.price}
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="text-sm lg:text-base font-medium">
                        Rp {product.price * product.quantity}
                      </span>
                    </td>
                  </tr>
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
                  <div className="flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full">
                    <input
                      placeholder="Apply coupon"
                      value="90off"
                      className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none focus:border-blue-500 border-1"
                    />
                    <button className="text-sm flex items-center px-3 py-1 text-white bg-orange-800 rounded-full outline-none md:px-4 hover:opacity-50 focus:outline-none active:outline-none">
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
                  <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Subtotal
                  </div>
                  <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    148,827.53€
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-b">
                  <div className="flex items-center lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-gray-800">
                    <RiDeleteBin6Line className="mr-2 w-4 text-red-600 transform transition duration-500 hover:scale-125 cursor-pointer" />
                    <span>Coupon "90off"</span>
                  </div>
                  <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-green-500">
                    -133,944.77€
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-b">
                  <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center">
                    Total
                  </div>
                  <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-red-600">
                    17,859.3€
                  </div>
                </div>

                {/* checkout button */}
                <button className="flex items-center justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-orange-800 rounded-full shadow item-center hover:opacity-50 focus:shadow-outline focus:outline-none">
                  <IoIosCard className="text-lg" />
                  <span className="ml-2">Proceed to checkout</span>
                </button>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
