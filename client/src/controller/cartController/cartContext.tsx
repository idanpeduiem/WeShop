import React, { createContext, useContext } from "react";
import { Item } from "../../models";

interface CartContextProps {
  cartItems: Item[];
  addItemToCart: (item: Item) => void;
  removeItemFromCart: (id: Item["id"]) => void;
}

const defaultValue: CartContextProps = {
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
};

export const CartContext = createContext(defaultValue);
export const useCartContext = () => useContext(CartContext);
