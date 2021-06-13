import { createContext, useReducer } from 'react'
// files
import CartReducer, { InitialState } from './CartReducer'
import { ChildrenProps } from 'types'

// context initial state
const initialState = {
  cart: [],
  dispatch: () => null,
}

// create Cart context to consume
export const CartContext = createContext<InitialState>(initialState)

// Cart Context Provider
export const CartProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [state, dispatch] = useReducer(CartReducer, initialState) // useReducer hanyalah upgraded version of useState

  return (
    <CartContext.Provider
      // value === return value dari useContext
      value={{
        cart: state.cart, // context state
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
