import { Grid, Paper, Typography } from "@mui/material";
import { ItemDetails } from "../utils/types";
import ItemCard from "./common/ItemCard";
import { useWishlistContext } from "../controller/wishlistController/wishlistContext";

const Wishlist = () => {
  const { wishlistItems } = useWishlistContext();

  return (
    <Paper variant={"outlined"}>
      {(!!wishlistItems.length && (
        <Grid container padding={2} spacing={2}>
          {wishlistItems.map((item: ItemDetails) => (
            <Grid item xs={3} key={item._id}>
              <ItemCard key={item._id} item={item} disableAddToCart />
            </Grid>
          ))}
        </Grid>
      )) || (
        <Typography variant="h4" align={"center"}>
          No items in wishlist yet
        </Typography>
      )}
    </Paper>
  );
};

export default Wishlist;
