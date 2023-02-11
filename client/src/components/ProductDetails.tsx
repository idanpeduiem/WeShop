import { useParams } from "react-router";
import { useQuery } from "react-query";
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { getItemQuery } from "../queries";
import { CartItem, ItemDetails, ItemStock, Size } from "../utils/types";
import React, { useState } from "react";
import FetchingState from "../utils/fetchingState";
import { useCartContext } from "../controller/cartController/cartContext";
import { useWishlistContext } from "../controller/wishlistController/wishlistContext";
import WishlistIcon from "./common/wishlistIcon";
import { useSnackbar } from "notistack";

interface ItemSizesProps {
  itemStocks: ItemStock;
  onSelectItem: (value: string) => void;
}

const ItemSizes: React.FC<ItemSizesProps> = ({
  itemStocks: sizeStocks,
  onSelectItem,
}) => (
  <FormControl>
    <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
      onChange={(event, value) => onSelectItem}
    >
      {sizeStocks.map((sizeStock) => {
        return (
          <FormControlLabel
            disabled={sizeStock.quantity === 0}
            value={sizeStock.size[0]._id}
            control={<Radio />}
            onClick={(value: any) => onSelectItem(value.target.value)}
            label={sizeStock.size[0].description}
          />
        );
      })}
    </RadioGroup>
  </FormControl>
);

const ProductDetails: React.FC = () => {
  const { id = " " } = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const { addItem, cartItems} = useCartContext();
  const [selectedSize, setSelectedSize] = useState<Size["_id"]>();
  const [quantity, setQuantity] = useState(1);
  const {
    data: item,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ItemDetails>(["item", id], () => getItemQuery(id));

  const onSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
    setQuantity(1);
  };

  const isQuantityValid = () => {
    const itemFromCart = cartItems.find(cartItem => cartItem.item._id === item!._id);
    const itemStock = item!.stock!.find((stock) => stock.size[0]._id === selectedSize)

    if ((itemFromCart && itemFromCart.quantity + quantity > itemStock!.quantity) ||
        itemStock!.quantity < quantity) {
        return false;
      }
   return true;
  }

  const onAddToCart = () => {
    if (!selectedSize) {
      enqueueSnackbar("Please choose item size", { variant: "info" });
    } else if(!isQuantityValid()){
      enqueueSnackbar("Reached max item quantity!", { variant: "error" });
      console.log('errr')

    } else {
      const size = item!.stock!.find(
        (stock) => stock.size[0]._id === selectedSize
      )!.size[0];
      const cartItem: CartItem = {
        item: item!,
        size,
        quantity,
      };
      addItem(cartItem);
      setQuantity(1);
    }
  };

  const onChangeQuantity = (isIncrement: boolean) => {
    if (!selectedSize) {
      enqueueSnackbar("Please choose item size", { variant: "info" });
      return;
    }

    if (isIncrement) {
        setQuantity((prev) => prev + 1);
    } else {
      if (quantity >= 2) setQuantity((prev) => prev - 1);
    }
  };

  const QuantityBox = () => (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <IconButton
        onClick={() => onChangeQuantity(false)}
        aria-label="remove"
        disabled={quantity === 1}
        color="primary"
      >
        <RemoveCircleOutlineIcon />
      </IconButton>
      <p style={{ fontSize: "20px" }}>{quantity}</p>
      <IconButton
        onClick={() => onChangeQuantity(true)}
        aria-label="remove"
        color="primary"
      >
        <ControlPointIcon />
      </IconButton>
    </div>
  );

  return (
    <FetchingState
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
    >
      {item && (
        <Grid container>
          <Grid item xs={6} justifyContent="center">
            <h1>{item.description}</h1>
            <h2>
              {item.category.description} - {item.department.description}
            </h2>
            <h1>{item.price}₪</h1>
            <ItemSizes itemStocks={item.stock!} onSelectItem={onSizeSelect} />
            <QuantityBox />
            <div style={{ marginTop: "30px" }}>
              <Button variant="outlined" onClick={onAddToCart}>
                Add to cart
              </Button>
                <WishlistIcon itemId={item._id}/>
            </div>
          </Grid>
          <Grid item xs={6} justifyItems="flex-end">
            <img
              style={{ height: "60vh", width: "60vh" }}
              alt=""
              src={item.image}
            />
          </Grid>
        </Grid>
      )}
    </FetchingState>
  );
};
export default ProductDetails;
