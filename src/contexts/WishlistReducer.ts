import { InitialState } from './WishlistContext'

export interface WishlistPayload {
  id: string
  name: string
  price: number
  imageName: string
  imageUrl: string
}

export interface Action {
  type: string
  payload: WishlistPayload
}

export default function WishlistReducer(
  state: InitialState,
  { type, payload }: Action
) {
  switch (type) {
    case 'ADD_WISHLIST':
      // cek kalo sudah ada barang yg sama di wishlist list
      const prevPayload = state.wishlist.find((el) => el.id === payload.id)
      // cari index nya
      const prevPayloadIndex = state.wishlist.findIndex(
        (el) => el.id === payload.id
      )
      let newWishlist = [...state.wishlist]

      // kalo ada, hanya ganti quantity dari payload tersebut
      if (prevPayload !== undefined || prevPayloadIndex !== -1) {
        newWishlist.splice(prevPayloadIndex, 1) // remove element from array index

        return {
          ...state,
          wishlist: [...newWishlist, payload],
        }
      }

      return {
        ...state,
        wishlist: [...state.wishlist, payload],
      }

    case 'DEL_WISHLIST':
      const filteredWishlist = state.wishlist.filter(
        (product) => product.id !== payload.id
      )

      return {
        ...state,
        wishlist: filteredWishlist,
      }

    default:
      return state
  }
}
