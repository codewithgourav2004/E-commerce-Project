import React, { createContext, useReducer } from "react";

// Create Context
export const CartContext = createContext();

// Initial State
const initialState = [];

// Reducer Function
function cartReducer(state, action) {
  switch (action.type) {
    case "Add":
      const exists = state.find(item => item.id === action.product.id);
      if (exists) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.product, quantity: 1 }];
      }

    case "Increase":
      return state.map(item =>
        item.id === action.id && item.quantity < 10
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "Decrease":
      return state.map(item =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case "Remove":
      return state.filter(item => item.id !== action.id);

    default:
      return state;
  }
}

// Context Provider
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
