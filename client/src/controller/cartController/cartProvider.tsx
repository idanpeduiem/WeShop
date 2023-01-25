import { PropsWithChildren, useState } from "react";
import { CartContext } from "./cartContext";
import { Item } from "../../models";
import { useSnackbar } from "notistack";

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setItems] = useState<Item[]>([]);
  const snackbar = useSnackbar();

  const addItemToCart = (item: Item) => {
    setItems((otherItems) => {
      return [...otherItems, item];
    });
    snackbar.enqueueSnackbar("item added to cart!");
  };

  const removeItemFromCart = (id: string) => {
    setItems([...cartItems.filter((item) => item.id == id)]);
    snackbar.enqueueSnackbar("item removed");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
