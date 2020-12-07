import { createContext, useReducer, Dispatch } from 'react';
// files
import CartReducer, { Action, Payload } from './CartReducer';

export interface InitialState {
  cart: [] | Payload[]; // context initial state type
  dispatch: Dispatch<Action>;
}

// context initial state
const initialState = {
  cart: [],
  dispatch: () => null,
};

// create Cart context to consume
export const CartContext = createContext<InitialState>(initialState);

// Cart Context Provider
export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CartReducer, initialState); // useReducer hanyalah upgraded version of useState

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
  );
};
