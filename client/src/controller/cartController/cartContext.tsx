import React, { createContext, useContext } from "react";
import {CartItem, Item, ItemDetails } from "../../utils/types";

interface CartContextProps {
  cartItems: CartItem[];
  cartValue: number,
  addItem: (cartItem: CartItem) => void;
  removeItem: (id: Item["_id"]) => void;
}

const defaultValue: CartContextProps = {
  cartItems: [],
  cartValue: 0,
  addItem: () => {},
  removeItem: () => {},
};

export const CartContext = createContext(defaultValue);
export const useCartContext = () => useContext(CartContext);
