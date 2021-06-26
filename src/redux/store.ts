import { configureStore, Dispatch } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
// import { setupListeners } from '@reduxjs/toolkit/query/react'
// files
import cartReducer from './slices/cart'
import wishlistReducer from './slices/wishlist'
// import { productsApi } from './slices/productsApi'
// import { usersApi } from './slices/usersApi'

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [productsApi.reducerPath]: productsApi.reducer,
    // [usersApi.reducerPath]: usersApi.reducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(productsApi.middleware, usersApi.middleware), // require('redux-logger')
})

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>()

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
//setupListeners(store.dispatch)

export default store
