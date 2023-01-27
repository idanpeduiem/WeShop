import { Badge, Button, Card } from "@mui/material";
import "./ItemCard.css";
import { useCartContext } from "../../controller/cartController/cartContext";
import { ItemDetails } from "../../utils/types";

interface ItemCardProps {
  item: ItemDetails;
  disableAddToCart?: boolean;
  enableRemoveFromCart?: boolean;
}

const ItemCard = ({
  item: { _id, description, price, image },
  disableAddToCart,
  enableRemoveFromCart,
}: ItemCardProps) => {
  const { addItem, removeItem } = useCartContext();

  return (
    <Badge
      badgeContent={enableRemoveFromCart && "X"}
      color="secondary"
      onClick={() => removeItem(_id)}
    >
      <Card className="itemContainer">
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
