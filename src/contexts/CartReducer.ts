// import { InitialState } from './CartContext';

import { InitialState } from './CartContext'

export interface Image {
  imageName: string
  imageUrl: string
}

export interface Product {
  createdAt: string
  desc: string
  images: Image[]
  labels: string[]
  price: number
  stock: number
  title: string
  updatedAt: string
  __v: number
  _id: string
}

// keseluruhan object product + quantity
export interface Payload extends Product {
  quantity: number
}

export interface Action {
  type: string
  payload: Payload
}

export default function CartReducer(
  state: InitialState,
  { type, payload }: Action
) {
  switch (type) {
    case 'ADD_PRODUCT':
      // cek kalo sudah ada barang yg sama di cart list
      const prevPayload = state.cart.find((el) => el._id === payload._id)
      // cari index nya
      const prevPayloadIndex = state.cart.findIndex(
        (el) => el._id === payload._id
      )
      let newCart = [...state.cart]

      // kalo ada, hanya ganti quantity dari payload tersebut
      if (prevPayload !== undefined || prevPayloadIndex !== -1) {
        newCart.splice(prevPayloadIndex, 1) // remove element from array index

        return {
          ...state,
          cart: [...newCart, payload],
        }
      }

      return {
        ...state,
        cart: [...state.cart, payload],
      }

    case 'DEL_PRODUCT':
      const filteredCart = state.cart.filter(
        (product) => product._id !== payload._id
      )

      return {
        ...state,
        cart: filteredCart,
      }

    default:
      return state
  }
}
