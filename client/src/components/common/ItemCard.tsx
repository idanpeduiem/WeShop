import * as React from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { ItemDetails, Size } from "../../utils/types";
import { RoutePaths } from "../../App";
import WishlistIcon from "./wishlistIcon";

interface ItemCardProps {
  item: ItemDetails;
  disableAddToCart?: boolean;
  disableAddToWishlist?: boolean;
  enableRemoveFromCart?: boolean;
  cartData?: {
    size: Size;
    quantity: number;
  };
}

const ItemCard: React.FC<ItemCardProps> = ({
  item: { _id, description, price, image },
  disableAddToWishlist,
  cartData,
}: ItemCardProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`${RoutePaths.PRODUCT_DETAILS_NO_ID}/${_id}`)}
    >
      <CardMedia image={image} component="img" />
      <CardContent>
        <Typography variant="h6">{description}</Typography>
        <Typography variant="body2">{price}₪</Typography>
        {cartData && (
          <Typography variant="body2">
            {cartData.size.description} X {cartData.quantity}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Grid container justifyContent={"space-between"}>
          {!disableAddToWishlist && <WishlistIcon itemId={_id} />}
        </Grid>
      </CardActions>
    </Card>
  );
};
export default ItemCard;
