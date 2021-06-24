import { configureStore, Dispatch } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
// files
import cartReducer from './slices/cart'
import wishlistReducer from './slices/wishlist'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(require('redux-logger')),
})

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>()

export default store
