import { PropsWithChildren, useState } from "react";
import { CartContext } from "./cartContext";
import { useSnackbar } from "notistack";
import { ItemDetails } from "../../utils/types";
import { useQuery } from "react-query";
import { addItemToCart, getItemsFromCart } from "../../queries";
import { useUserContext } from "../userController/userContext";

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setItems] = useState<ItemDetails[]>([]);
  const snackbar = useSnackbar();
  const { user } = useUserContext();

  const { refetch } = useQuery<ItemDetails[]>(
    ["cartItems", user?.uid],
    () => getItemsFromCart(user?.uid!),
    {
      onSuccess: (items = []) => setItems(items),
    }
  );

  const addItem = (id: ItemDetails["_id"]) => {
    // useQuery(["dsada"], () => addItemToCart(user?.uid!, id), {
    //   onSuccess: () => {
    //     refetch();
    //     snackbar.enqueueSnackbar("item added to cart!", { variant: "success" });
    //   },
    //   onError: () => snackbar.enqueueSnackbar("Failed", { variant: "error" }),
    // });
  };

  const removeItem = (id: ItemDetails["_id"]) => {
    refetch();
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
