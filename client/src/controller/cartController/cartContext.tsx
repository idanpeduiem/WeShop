import React, { createContext, useContext } from "react";
import {CartItem, Item, ItemDetails } from "../../utils/types";

interface CartContextProps {
  cartItems: CartItem[];
  addItem: (cartItem: CartItem) => void;
  removeItem: (id: Item["_id"]) => void;
}

const defaultValue: CartContextProps = {
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
};

export const CartContext = createContext(defaultValue);
export const useCartContext = () => useContext(CartContext);
