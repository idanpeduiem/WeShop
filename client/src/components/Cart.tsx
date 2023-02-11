import {  Button, Divider, Grid, Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";
import { useCartContext } from "../controller/cartController/cartContext";
import { CartItem } from "../utils/types";
import ItemCard from "./common/ItemCard";
import OrderPopup from "./OrderPopup";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, cartValue } = useCartContext();
 
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Paper variant={"outlined"}>
          <Grid container direction={"column"} padding={3} rowSpacing={15}>
            <Grid item>
              <Typography variant={"h5"}>Summery</Typography>
              <Typography dir={"rtl"}>{cartValue}₪</Typography>
            </Grid>
            <Grid item>
              <Stack spacing={2}>
                <Divider />
                {cartValue > 0 && <OrderPopup/>}
                <Button
                  variant={"text"}
                  color={"secondary"}
                  size={"small"}
                  fullWidth
                  onClick={() => navigate(RoutePaths.HOME)}
                >
                  continue shopping
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Paper variant={"outlined"}>
          {cartItems.length > 0 
           ?
          (<Grid container padding={2}>
            {cartItems.map((item: CartItem) => (
              <Grid item xs={3} key={item.item._id}>
                <ItemCard
                  key={item.item._id}
                  item={item.item}
                  disableAddToCart
                  enableRemoveFromCart
                  cartData={{size: item.size, quantity: item.quantity}}
                />
              </Grid>
            ))}
            </Grid>)
            :
            <h2 style={{textAlign: 'center'}}>No items in cart yet</h2>
          }
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Cart;
