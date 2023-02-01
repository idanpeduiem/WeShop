import * as React from "react";
import { useNavigate } from "react-router";
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useCartContext } from "../../controller/cartController/cartContext";
import { ItemDetails } from "../../utils/types";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { RoutePaths } from "../../App";
import Stack from "@mui/material/Stack";

interface ItemCardProps {
  item: ItemDetails;
  disableAddToCart?: boolean;
  enableRemoveFromCart?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item: { _id, description, price, image },
  disableAddToCart,
  enableRemoveFromCart,
}: ItemCardProps): JSX.Element => {
  const { addItem, removeItem } = useCartContext();
  const navigate = useNavigate();

  return (
    <Badge
      invisible={!enableRemoveFromCart}
      badgeContent={
        <IconButton
          size="large"
          color="inherit"
          onClick={() => removeItem(_id)}
        >
          <RemoveShoppingCartIcon />
        </IconButton>
      }
    >
      <Card
        onClick={() => navigate(RoutePaths.PRODUCT_DETAILS_NO_ID + "/" + _id)}
      >
        <CardMedia image={image} sx={{ height: 140 }}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
        </CardContent>
        <CardActions>
          {!disableAddToCart && (
            <Button
              color={"secondary"}
              variant={"contained"}
              onClick={(event) => {
                addItem(_id);
                event.stopPropagation();
              }}
            >
              Add to cart
            </Button>
          )}
        </CardActions>
      </Card>
    </Badge>
  );
};
export default ItemCard;
