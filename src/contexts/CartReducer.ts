import { Dispatch } from 'react'
// files
import { IReview } from 'types/Review'

export interface InitialState {
  cart: ProductPayload[] // context initial state type
  dispatch: Dispatch<Action>
}

export interface Image {
  imageName: string
  imageUrl: string
  publicId: string
  tags?: string
}

export interface Product {
  desc: string
  images: Image[]
  labels: string[]
  price: number
  stock: number
  title: string
  sold: number // new
  reviews: IReview[] // new
  createdAt: string
  updatedAt: string
  __v: number
  _id: string
}

// keseluruhan object product + quantity
export interface ProductPayload extends Product {
  quantity: number
}

export type Action =
  | {
      type: 'ADD_PRODUCT'
      payload: ProductPayload
    }
  | {
      type: 'DEL_PRODUCT'
      payload: string
    }

export default function CartReducer(
  state: InitialState,
  action: Action
): InitialState {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      // cek kalo sudah ada barang yg sama di cart list
      const prevPayload = state.cart.find((el) => el._id === action.payload._id)
      // cari index nya
      const prevPayloadIndex = state.cart.findIndex(
        (el) => el._id === action.payload._id
      )
      const newCart = [...state.cart]

      // kalo ada, hanya ganti quantity dari payload tersebut
      if (prevPayload !== undefined || prevPayloadIndex !== -1) {
        newCart.splice(prevPayloadIndex, 1) // remove element from array index

        return {
          ...state,
          cart: [...newCart, action.payload],
        }
      }

      return {
        ...state,
        cart: [...state.cart, action.payload],
      }
    }

    case 'DEL_PRODUCT':
      return {
        ...state,
        cart: state.cart.filter((product) => product._id !== action.payload),
      }

    default:
      return state
  }
}
