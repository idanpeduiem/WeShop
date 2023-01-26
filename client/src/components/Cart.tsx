import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";

const Cart = () => {
  const totalAmount = 1000;
  const navigate = useNavigate();

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
          <Button>here we need to add items from cart provider</Button>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Cart;
