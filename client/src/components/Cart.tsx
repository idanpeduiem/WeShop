import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";
import { useCartContext } from "../controller/cartController/cartContext";
import { ItemDetails } from "../utils/types";
import ItemCard from "./common/ItemCard";

const Cart = () => {
  const totalAmount = 1000;
  const navigate = useNavigate();
  const { cartItems } = useCartContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Paper variant={"outlined"}>
          <Grid container direction={"column"} padding={3} rowSpacing={15}>
            <Grid item>
              <Typography variant={"h5"}>Summery</Typography>
              <Typography dir={"rtl"}>{totalAmount}₪</Typography>
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
            {cartItems.map((item: ItemDetails) => (
              <Grid item xs={3} key={item._id}>
                <ItemCard
                  key={item._id}
                  item={item}
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
