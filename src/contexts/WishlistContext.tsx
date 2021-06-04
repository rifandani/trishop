import { createContext, useReducer, Dispatch } from 'react'
// files
import WishlistReducer, { Action, WishlistPayload } from './WishlistReducer'

export interface InitialState {
  wishlist: WishlistPayload[] // context initial state type
  dispatchWish: Dispatch<Action>
}

// context initial state
const initialState = {
  wishlist: [],
  dispatchWish: () => null,
}

// create Wishlist context to consume
export const WishlistContext = createContext<InitialState>(initialState)

// Wishlist Context Provider
export const WishlistProvider = ({ children }: any) => {
  const [state, dispatchWish] = useReducer(WishlistReducer, initialState) // useReducer hanyalah upgraded version of useState

  return (
    <WishlistContext.Provider
      // value === return value dari useContext
      value={{
        wishlist: state.wishlist, // context state
        dispatchWish,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
