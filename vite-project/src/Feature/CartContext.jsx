// src/Feature/CartContext.jsx
import { createContext, useContext, useEffect, useReducer } from "react";

// Create Context
export const CartContext = createContext();

// Load from localStorage
const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case "INCREASE":
      return state.map(item =>
        item.id === action.id && item.quantity < 10
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE":
      return state.map(item =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case "REMOVE":
      return state.filter(item => item.id !== action.id);

    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, getInitialCart());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
