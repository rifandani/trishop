import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// files
import { RootState } from '../store'

export interface WishlistPayload {
  _id: string
  name: string
  price: number
  imageName: string
  imageUrl: string
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    count: 0,
    values: [] as WishlistPayload[],
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Immer library.
  reducers: {
    addProductToWishlist: (state, action: PayloadAction<WishlistPayload>) => {
      // cek kalo sudah ada barang yg sama di wishlist list
      const prevPayload = state.values.find(
        (el) => el._id === action.payload._id
      )
      // cari index nya
      const prevPayloadIndex = state.values.findIndex(
        (el) => el._id === action.payload._id
      )
      const newWishlist = [...state.values]

      // kalo ada, hanya ganti quantity dari payload tersebut
      if (prevPayload !== undefined || prevPayloadIndex !== -1) {
        newWishlist.splice(prevPayloadIndex, 1) // remove element from array index

        state.values = [...newWishlist, action.payload]
        return
      }

      state.values = [...state.values, action.payload]
      state.count++
    },
    deleteProductFromWishlist: (state, action: PayloadAction<string>) => {
      state.values = state.values.filter((prod) => prod._id !== action.payload)
      state.count--
    },
  },
})

// wishlist selector
export const wishlistSelector = (state: RootState): WishlistPayload[] =>
  state.wishlist.values

// wishlist actions
export const { addProductToWishlist, deleteProductFromWishlist } =
  wishlistSlice.actions

// wishlist reducer
export default wishlistSlice.reducer
