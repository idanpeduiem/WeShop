import { Card } from '@mui/material';
import './ItemCard.css';

interface ItemCardProps {
    name: string;
    price: number;
    imageUrl: string;
}

const ItemCard = (props: ItemCardProps) => {
    const {name, price, imageUrl} = props;
  return (
    <Card className="itemContainer">
      <img src={imageUrl} alt='תמונת הפריט' className="img"/>
      <div className='firstRow'>
        <div>{name}</div>
        <div>{price}</div>
      </div>
    </Card>
  );
};
export default ItemCard;
