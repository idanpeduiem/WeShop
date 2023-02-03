import { PropsWithChildren, useState } from "react";
import { CartContext } from "./cartContext";
import { useSnackbar } from "notistack";
import { Cart, CartItem, ItemDetails } from "../../utils/types";
import { useQuery } from "react-query";
import { addItemToCart, getItemsFromCart } from "../../queries";
import { useUserContext } from "../userController/userContext";

export const CartProvider = ({ children }: PropsWithChildren) => {
  const snackbar = useSnackbar();
  const { user } = useUserContext();
  const [cartItems, setCartItems] = useState<Cart['items']>([]);

  const { data = [], refetch: fetchGetItems } = useQuery<Cart['items']>(["cartItems"], () => getItemsFromCart(user?.uid!),
   { enabled: !!user, onSuccess: (data) => setCartItems(data) });

  const addItem = (cartItem: CartItem) => {
    addItemToCart(cartItem)
      .then(() => {
        snackbar.enqueueSnackbar("item added to cart!", { variant: "success" });
        fetchGetItems();
      })
      .catch(() => {
        snackbar.enqueueSnackbar("Failed", { variant: "error" });
      });
  };

  const removeItem = (id: ItemDetails["_id"]) => {
    snackbar.enqueueSnackbar("item removed");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
