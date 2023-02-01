import { PropsWithChildren, useState } from "react";
import { CartContext } from "./cartContext";
import { useSnackbar } from "notistack";
import { ItemDetails } from "../../utils/types";
import { useQuery } from "react-query";
import { addItemToCart, getItemsFromCart } from "../../queries";
import { useUserContext } from "../userController/userContext";
import { User } from "firebase/auth";

export interface CartItem {
  userId: User["uid"];
  itemId: ItemDetails["_id"];
  size: string; // TODO: add quantity
}

export const CartProvider = ({ children }: PropsWithChildren) => {
  const snackbar = useSnackbar();
  const { user } = useUserContext();
  const [cartItems, setCartItems] = useState<ItemDetails[]>([]);

  const { refetch: fetchGetItems } = useQuery<ItemDetails[]>(
    ["cartItems"],
    () => getItemsFromCart(user?.uid!),
    { enabled: !!user, onSuccess: (data) => setCartItems(data) }
  );

  const addItem = (itemId: ItemDetails["_id"]) => {
    addItemToCart({ userId: user!.uid, itemId, size: "Small" })
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
