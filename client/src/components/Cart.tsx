import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";
import { useCartContext } from "../controller/cartController/cartContext";
import { CartItem, ItemDetails } from "../utils/types";
import ItemCard from "./common/ItemCard";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useCartContext();

  const totalValue = useMemo(() => {
    const sumValue = cartItems.reduce((currSum,item) =>  (currSum + (item.item.price) * (item.quantity)),0);
    return sumValue;
  },[cartItems]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Paper variant={"outlined"}>
          <Grid container direction={"column"} padding={3} rowSpacing={15}>
            <Grid item>
              <Typography variant={"h5"}>Summery</Typography>
              <Typography dir={"rtl"}>{totalValue}₪</Typography>
            </Grid>
            <Grid item>
              <Stack spacing={2}>
                <Divider />
                <Button variant={"contained"} fullWidth>
                  Order now!
                </Button>
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
          <Grid container padding={2}>
            {cartItems.map((item: CartItem) => (
              <Grid item xs={3} key={item.item._id}>
                <ItemCard
                  key={item.item._id}
                  item={item.item}
                  disableAddToCart
                  enableRemoveFromCart
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Cart;
