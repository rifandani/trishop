import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// files
import { RootState } from '../store'
import { IReview } from 'types/Review'

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
export interface CartPayload extends Product {
  quantity: number
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0,
    values: [] as CartPayload[],
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Immer library.
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartPayload>) => {
      // cek kalo sudah ada barang yg sama di cart list
      const prevPayload = state.values.find(
        (el) => el._id === action.payload._id
      )
      // cari index nya
      const prevPayloadIndex = state.values.findIndex(
        (el) => el._id === action.payload._id
      )
      const newCart = [...state.values]

      // kalo ada, hanya ganti quantity dari payload tersebut
      if (prevPayload !== undefined || prevPayloadIndex !== -1) {
        newCart.splice(prevPayloadIndex, 1) // remove element from array index

        state.values = [...newCart, action.payload]
        return
      }

      state.values = [...state.values, action.payload]
      state.count++
    },
    deleteProductFromCart: (state, action: PayloadAction<string>) => {
      state.values.filter((prod) => prod._id === action.payload)
      state.count - 1
    },
  },
})

// cart selector
export const cartSelector = (state: RootState): CartPayload[] =>
  state.cart.values

// cart actions
export const { addProductToCart, deleteProductFromCart } = cartSlice.actions

// cart reducer
export default cartSlice.reducer
