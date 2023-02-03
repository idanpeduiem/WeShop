import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as React from "react";
import { IconButton, IconButtonProps } from "@mui/material";
import { useWishlistContext } from "../../controller/wishlistController/wishlistContext";
import { useMemo } from "react";
import { ItemDetails } from "../../utils/types";

interface WishlistIconProps extends IconButtonProps {
  itemId: ItemDetails["_id"];
}

const WishlistIcon = ({
  itemId: _id,
  color = "secondary",
  ...iconProps
}: WishlistIconProps) => {
  const {
    wishlistItems,
    addItem: addItemToWishlist,
    removeItem: removeItemFromWishlist,
  } = useWishlistContext();
  const itemOnWishlist = useMemo<boolean>(
    () => wishlistItems.some(({ _id: itemId }) => itemId == _id),
    [wishlistItems]
  );
  const onWishlistIconClicked = () => {
    itemOnWishlist ? removeItemFromWishlist(_id) : addItemToWishlist(_id);
  };
  return (
    <IconButton
      {...iconProps}
      color={color}
      onClick={(event) => {
        onWishlistIconClicked();
        event.stopPropagation();
      }}
    >
      {itemOnWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default WishlistIcon;
