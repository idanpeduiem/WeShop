import { PropsWithChildren, useState } from "react";
import { CartContext } from "./cartContext";
import { useSnackbar } from "notistack";
import {Cart, CartItem, ItemDetails, Size} from "../../utils/types";
import { useQuery } from "react-query";
import {
  addItemToCart,
  getItemsFromCart,
  removeItemFromCart,
} from "../../queries";
import { useUserContext } from "../userController/userContext";

type CartResponse = {
  items: Cart["items"];
  value: number;
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const snackbar = useSnackbar();
  const { user } = useUserContext();
  const [cartItems, setCartItems] = useState<Cart["items"]>([]);
  const [cartValue, setCartValue] = useState(0);

  const { data, refetch: fetchGetItems } = useQuery<CartResponse>(
    ["cartItems"],
    () => getItemsFromCart(),
    {
      enabled: !!user,
      onSuccess: (data) => {
        setCartItems(data.items);
        setCartValue(data.value);
      },
    }
  );

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

  const removeItem = (itemId: ItemDetails["_id"], sizeId: Size['_id']) => {
    removeItemFromCart(itemId, sizeId)
      .then(() => {
        snackbar.enqueueSnackbar("item removed");
        fetchGetItems();
      })
      .catch(() => {
        snackbar.enqueueSnackbar("Failed", { variant: "error" });
      });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartValue,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
