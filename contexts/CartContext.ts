import { createContext, useReducer } from 'react';
// files
import CartReducer, { Payload } from './CartReducer';

// cart initial state
const initialState = {
  cart: [],
};

// create Cart context to consume
export const CartContext = createContext(initialState);

// Cart context provider
export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  function addProduct(payload: Payload) {
    dispatch({
      type: 'ADD_PRODUCT',
      payload,
    });
  }

  function deleteProduct(productId: string) {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: productId,
    });
  }

  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
};
