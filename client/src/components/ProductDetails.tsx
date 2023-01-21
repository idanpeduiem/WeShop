import { useParams } from "react-router";
import { useQuery } from 'react-query'
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { getItemQuery } from "../queries";
import { ItemDetails, Size } from "../utils/types";
import React, { useState } from "react";

interface ItemSizesProps {
  sizeStocks: Size[];
  onSelectItem: (value: string) => void;
}

const ItemSizes: React.FC<ItemSizesProps> = ({sizeStocks, onSelectItem}) => (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
        <RadioGroup
         row
         aria-labelledby="demo-row-radio-buttons-group-label"
         name="row-radio-buttons-group"
         onChange={(event,value) => onSelectItem}
      >
        {
          sizeStocks.map(sizeStock =>
           <FormControlLabel 
           value={sizeStock._id} 
           control={<Radio />} 
           label={sizeStock.description} />)
        }
      </RadioGroup>
    </FormControl>
);

const ProductDetails:React.FC = () => {
  const { id = " "} = useParams();
  const [selectedSize, setSelectedSize] = useState<Size['_id']>();
  const [quantity, setQuantity] = useState(1);
  const {data: item ,isLoading, isError} = useQuery<ItemDetails>(['item',id], () => getItemQuery(id));

  const onSizeSelect = (itemId: string) => {
    setSelectedSize(itemId);
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!item || isError) {
    return <span>Error</span>
  }

  const {description,price,image,department,category,stock} = item;
  console.log(item)
  return (
    <>
      <Grid container>
        <Grid item xs={6} justifyContent='center'>
          <h1>{description}</h1>
          <h2>{category.description} - {department.description}</h2>
          <h1>{price}₪</h1>
          <ItemSizes sizeStocks={stock} onSelectItem={onSizeSelect}/>
          <Button>Add to cart</Button>
          <Button>Add to ♥</Button>
        </Grid>
        <Grid item xs={6} justifyItems='flex-end'>
          <img style={{height: "60vh", width:"60vh"}} alt ='' src={image}/>
        </Grid>
      </Grid>
    </>
  );
};
export default ProductDetails;
