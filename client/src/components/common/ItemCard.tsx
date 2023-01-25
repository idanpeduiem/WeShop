import {Button, Card} from '@mui/material';
import './ItemCard.css';
import {useCartContext} from "../../controller/cartController/cartContext";

interface ItemCardProps {
    name: string;
    price: number;
    imageUrl: string;
}

const ItemCard = (props: ItemCardProps) => {
    const {name, price, imageUrl} = props;
    const {addItemToCart} = useCartContext();
  return (
    <Card className="itemContainer">
      <img src={imageUrl} alt='תמונת הפריט' className="img"/>
      <div className='firstRow'>
        <div>{name}</div>
        <div>{price}</div>
          <Button onClick={() => addItemToCart({id: "1"})}></Button>
      </div>
    </Card>
  );
};
export default ItemCard;
