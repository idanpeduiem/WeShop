import React, { createContext, useContext } from "react";
import {ItemDetails} from "../../utils/types";

interface CartContextProps {
  cartItems: ItemDetails[];
  addItem: (itemId: ItemDetails['_id']) => void;
  removeItem: (id: ItemDetails["_id"]) => void;
}

const defaultValue: CartContextProps = {
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
};

export const CartContext = createContext(defaultValue);
export const useCartContext = () => useContext(CartContext);
