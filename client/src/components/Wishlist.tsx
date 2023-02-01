import { Grid, Paper } from "@mui/material";
import { ItemDetails } from "../utils/types";
import ItemCard from "./common/ItemCard";
import { useWishlistContext } from "../controller/wishlistController/wishlistContext";

const Wishlist = () => {
  const { wishlistItems } = useWishlistContext();

  return (
    <Paper variant={"outlined"}>
      <Grid container padding={2} spacing={2}>
        {wishlistItems.map((item: ItemDetails) => (
          <Grid item xs={3} key={item._id}>
            <ItemCard
              key={item._id}
              item={item}
              disableAddToCart
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Wishlist;
