import {
  Badge,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";
import { useCartContext } from "../controller/cartController/cartContext";
import { CartItem } from "../utils/types";
import ItemCard from "./common/ItemCard";
import OrderPopup from "./OrderPopup";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import * as React from "react";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, cartValue, removeItem: removeItemFromCart } = useCartContext();

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
                {cartValue > 0 && <OrderPopup />}
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
          {(!!cartItems.length && (
            <Grid container padding={2} spacing={2}>
              {cartItems.map(({ item, size, quantity }: CartItem) => (
                <Grid item xs={3} key={item._id}>
                  <Badge
                    component={"div"}
                    badgeContent={
                      <IconButton
                        size="large"
                        color="inherit"
                        onClick={() => removeItemFromCart(item._id, size._id)}
                      >
                        <RemoveShoppingCartIcon />
                      </IconButton>
                    }
                  >
                    <ItemCard
                      key={item._id}
                      item={item}
                      disableAddToCart
                      enableRemoveFromCart
                      cartData={{ size: size, quantity: quantity }}
                    />
                  </Badge>
                </Grid>
              ))}
            </Grid>
          )) || (
            <Typography variant="h4" align={"center"}>
              No items in cart yet
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Cart;
