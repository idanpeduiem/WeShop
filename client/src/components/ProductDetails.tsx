import { useParams } from "react-router";
import { useQuery } from 'react-query'
import { Alert, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Snackbar } from "@mui/material";
import { getItemQuery } from "../queries";
import { ItemDetails, ItemStock, Size } from "../utils/types";
import React, { useState } from "react";

interface ItemSizesProps {
  itemStocks: ItemStock;
  onSelectItem: (value: string) => void;
}

const ItemSizes: React.FC<ItemSizesProps> = ({itemStocks: sizeStocks, onSelectItem}) => (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
        <RadioGroup
         row
         aria-labelledby="demo-row-radio-buttons-group-label"
         name="row-radio-buttons-group"
         onChange={(event,value) => onSelectItem}
      >
        {
          sizeStocks.map(sizeStock => {
            return (
           <FormControlLabel 
           disabled={sizeStock.quantity===0}
           value={sizeStock.size[0]._id} 
           control={<Radio />} 
           onClick={(value: any) => onSelectItem(value.target.value)}
           label={sizeStock.size[0].description} />)})
        }
      </RadioGroup>
    </FormControl>
);

const ProductDetails:React.FC = () => {
  const { id = " "} = useParams();
  const [selectedSize, setSelectedSize] = useState<Size['_id']>();
  const [quantity, setQuantity] = useState(1);
  const [isSizeError, setIsSizeError] = useState(false);
  const {data: item ,isLoading, isError} = useQuery<ItemDetails>(['item',id], () => getItemQuery(id));

  const onSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
    console.log(sizeId);
  }

  const onAddToCart = () => {
    if(!selectedSize)
     setIsSizeError(true);
  }

  const onAddToWishList = () => {

  }

  const onChangeQuantity = (isIncrement: boolean) => {
    if(isIncrement){
      setQuantity(prev => prev + 1);
    }else {
      if(quantity >= 2)
      setQuantity(prev => prev - 1);
     }
  }

  const QuantityBox = () => (
    <div style={{display:'flex', flexDirection:'row'}}>
    <Button disabled={quantity === 1}  onClick={() => onChangeQuantity(false)} >-</Button>
    <p>{quantity}</p>
    <Button onClick={() => onChangeQuantity(true)}>+</Button>
   </div>
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!item || isError) {
    return <span>Error</span>
  }

  const {description,price,image,department,category,stock} = item;
  return (
    <>
      <Grid container>
        <Grid item xs={6} justifyContent='center'>
          <h1>{description}</h1>
          <h2>{category.description} - {department.description}</h2>
          <h1>{price}₪</h1>
          <div>
          <ItemSizes itemStocks={stock} onSelectItem={onSizeSelect}/>
          </div>
          <div>
          <QuantityBox/>
          </div>
          <div style={{marginTop: '30px'}}>
            <Button variant="outlined"  onClick={onAddToCart}>Add to cart</Button>
            <Button variant="outlined"  onClick={onAddToWishList}>Add to ♥</Button>
          </div>
        </Grid>
        <Grid item xs={6} justifyItems='flex-end'>
          <img style={{height: "60vh", width:"60vh"}} alt ='' src={image}/>
        </Grid>
        <Grid item xs={12}>
        <Snackbar
        open={isSizeError}
        onClose={() => setIsSizeError(false)}
        autoHideDuration={3000}
      >
         <Alert onClose={() => setIsSizeError(false)} severity="error" sx={{ width: '100%' }}>
           Please select size
        </Alert>
      </Snackbar>
        </Grid>
      </Grid>
    </>
  );
};
export default ProductDetails;
