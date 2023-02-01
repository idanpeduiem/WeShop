import * as React from "react";
import { useNavigate } from "react-router";
import {
  Badge,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useCartContext } from "../../controller/cartController/cartContext";
import { ItemDetails } from "../../utils/types";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { RoutePaths } from "../../App";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useWishlistContext } from "../../controller/wishlistController/wishlistContext";
import {useMemo, useState} from "react";

interface ItemCardProps {
  item: ItemDetails;
  disableAddToCart?: boolean;
  disableAddToWishlist?: boolean;
  enableRemoveFromCart?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item: { _id, description, price, image },
  disableAddToCart,
  disableAddToWishlist,
  enableRemoveFromCart,
}: ItemCardProps): JSX.Element => {
  const { addItem: addItemToCart, removeItem: removeItemFromCart } =
    useCartContext();
  const {
    wishlistItems,
    addItem: addItemToWishlist,
    removeItem: removeItemFromWishlist,
  } = useWishlistContext();
  const itemOnWishlist = useMemo<boolean>(() =>
    wishlistItems.some(({ _id: itemId }) => itemId == _id), [wishlistItems]
  );
  const navigate = useNavigate();

  const onWishlistIconClicked = () => {
    itemOnWishlist ? removeItemFromWishlist(_id) : addItemToWishlist(_id);
  };

  return (
    <Badge
      invisible={!enableRemoveFromCart}
      component={"div"}
      badgeContent={
        <IconButton
          size="large"
          color="inherit"
          onClick={() => removeItemFromCart(_id)}
        >
          <RemoveShoppingCartIcon />
        </IconButton>
      }
    >
      <Card
        onClick={() => navigate(RoutePaths.PRODUCT_DETAILS_NO_ID + "/" + _id)}
      >
        <CardMedia image={image} component="img" />
        <CardContent>
          <Typography variant="h6">{description}</Typography>
          <Typography variant="body2">{price}</Typography>
        </CardContent>
        <CardActions>
          <Grid container justifyContent={"space-between"}>
            {!disableAddToWishlist && (
              <IconButton
                color="secondary"
                onClick={(event) => {
                  onWishlistIconClicked();
                  event.stopPropagation();
                }}
              >
                {itemOnWishlist? <FavoriteIcon />: <FavoriteBorderIcon/>}
              </IconButton>
            )}
          </Grid>
        </CardActions>
      </Card>
    </Badge>
  );
};
export default ItemCard;
