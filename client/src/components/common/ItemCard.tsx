import { Button, Card } from "@mui/material";
import "./ItemCard.css";
import { useCartContext } from "../../controller/cartController/cartContext";
import {ItemDetails} from "../../utils/types";

interface ItemCardProps {
  item: ItemDetails;
}

const ItemCard = ({ item: { _id, description, price, image } }: ItemCardProps) => {
  const { addItem } = useCartContext();
  return (
    <Card className="itemContainer">
      <img src={image} alt="תמונת הפריט" className="img" />
      <div className="firstRow">
        <div>{description}</div>
        <div>{price}</div>
        <Button color={'secondary'} onClick={() => addItem(_id)}>Add to cart</Button>
      </div>
    </Card>
  );
};
export default ItemCard;
