import * as React from "react";
import { useNavigate } from "react-router";
import { Badge, Button, Card, IconButton } from "@mui/material";
import "./ItemCard.css";
import { useCartContext } from "../../controller/cartController/cartContext";
import { ItemDetails } from "../../utils/types";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { RoutePaths } from "../../App";

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
      <Card className="itemContainer" onClick={() => navigate(RoutePaths.PRODUCT_DETAILS_NO_ID + "/" + _id)}>
        <img src={image} alt="תמונת הפריט" className="img" />
        <div className="firstRow">
          <div>{description}</div>
          <div>{price}</div>
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
        </div>
      </Card>
    </Badge>
  );
};
export default ItemCard;
