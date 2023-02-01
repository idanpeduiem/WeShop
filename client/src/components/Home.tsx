import { useState } from "react";
import { Card, Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "react-query";

import ItemCard from "./common/ItemCard";
import { getAllItems } from "../queries";
import { ItemDetails } from "../utils/types";
import FilterProducts from "./FilterProducts";
import FetchingState from "../utils/fetchingState";

const Home = () => {
  const [filteredItems, setFilteredItems] = useState<ItemDetails[]>([]);

  const {
    data: items = [],
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ItemDetails[]>("users", getAllItems, {
    onSuccess: (items = []) => setFilteredItems(items),
  });

  return (
    <FetchingState
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
    >
      <Typography>Welcome to WeShop</Typography>
      <Grid container alignItems={"stretch"} columnSpacing={2}>
        <Grid item xs={9}>
          <Paper variant="outlined">
            <Grid container columnSpacing={2}>
              {filteredItems?.map((item: ItemDetails) => (
                <Grid item xs={3}>
                  <ItemCard key={item._id} item={item} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <FilterProducts
            allItems={items}
            setFilteredItems={setFilteredItems}
          />
        </Grid>
      </Grid>
    </FetchingState>
  );
};

export default Home;
