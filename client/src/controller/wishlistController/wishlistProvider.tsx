import { wishlistContext } from "./wishlistContext";
import { PropsWithChildren, useState } from "react";
import { useSnackbar } from "notistack";
import { useUserContext } from "../userController/userContext";
import { ItemDetails } from "../../utils/types";
import {
  addItemToWishlist,
  getItemsFromWishlist,
  removeItemFromWishlist,
} from "../../queries";
import { useQuery } from "react-query";
import { User } from "firebase/auth";

export interface wishlistItem {
  userId: User["uid"];
  itemId: ItemDetails["_id"];
}

const WishlistProvider = ({ children }: PropsWithChildren) => {
  const snackbar = useSnackbar();
  const { user } = useUserContext();
  const [wishlistItems, setWishlistItems] = useState<ItemDetails[]>([]);

  const { refetch: fetchGetItems } = useQuery<ItemDetails[]>(
    ["wishlistItems"],
    () => getItemsFromWishlist(),
    {
      enabled: !!user,
      onSuccess: (data) => setWishlistItems(data),
    }
  );

  const addItem = (itemId: ItemDetails["_id"]) => {
    addItemToWishlist({ userId: user!.uid, itemId })
      .then(() => {
        snackbar.enqueueSnackbar("item added to Wishlist!", {
          variant: "success",
        });
        fetchGetItems();
      })
      .catch(() => {
        snackbar.enqueueSnackbar("Failed", { variant: "error" });
      });
  };

  const removeItem = (itemId: ItemDetails["_id"]) => {
    removeItemFromWishlist(itemId)
      .then(() => {
        snackbar.enqueueSnackbar("item removed from wishlist");
        fetchGetItems();
      })
      .catch(() => {
        snackbar.enqueueSnackbar("Failed", { variant: "error" });
      });
  };

  return (
    <wishlistContext.Provider
      value={{
        wishlistItems,
        addItem,
        removeItem,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};

export default WishlistProvider;
