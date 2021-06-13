import { Dispatch } from 'react'

export interface InitialState {
  wishlist: WishlistPayload[] // context initial state type
  dispatchWish: Dispatch<Action>
}

export interface WishlistPayload {
  id: string
  name: string
  price: number
  imageName: string
  imageUrl: string
}

export type Action =
  | {
      type: 'ADD_WISHLIST'
      payload: WishlistPayload
    }
  | {
      type: 'DEL_WISHLIST'
      payload: string
    }

export default function WishlistReducer(
  state: InitialState,
  action: Action
): InitialState {
  switch (action.type) {
    case 'ADD_WISHLIST': {
      // cek kalo sudah ada barang yg sama di wishlist list
      const prevPayload = state.wishlist.find(
        (el) => el.id === action.payload.id
      )
      // cari index nya
      const prevPayloadIndex = state.wishlist.findIndex(
        (el) => el.id === action.payload.id
      )
      const newWishlist = [...state.wishlist]

      // kalo ada, hanya ganti quantity dari payload tersebut
      if (prevPayload !== undefined || prevPayloadIndex !== -1) {
        newWishlist.splice(prevPayloadIndex, 1) // remove element from array index

        return {
          ...state,
          wishlist: [...newWishlist, action.payload],
        }
      }

      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      }
    }

    case 'DEL_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product.id !== action.payload
        ),
      }

    default:
      return state
  }
}
