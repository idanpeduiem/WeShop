import { ChangeEvent, useState } from "react";
import { Grid, Pagination, Paper, Typography } from "@mui/material";
import { useQuery } from "react-query";

import ItemCard from "./common/ItemCard";
import { getAllItems, getNumOfPages } from "../queries";
import { ItemDetails } from "../utils/types";
import FilterProducts from "./FilterProducts";
import FetchingState from "../utils/fetchingState";

const Home = () => {
  const [filteredItems, setFilteredItems] = useState<ItemDetails[]>([]);
  const [activePage, setActivePage] = useState<number>(0);

  const { data: itemsList, isError, isLoading, isSuccess } = 
    useQuery<ItemDetails[]>(
      ["items", activePage],
      () => getAllItems(activePage),
      { keepPreviousData: true }
  );
  
  const { data: totalCount } =
      useQuery<number>("totalCount", getNumOfPages);

   const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setActivePage(page-1);
   }

  // const {
  //   data: items = [],
  //   isLoading,
  //   isError,
  //   isSuccess,
  // } = useQuery<ItemDetails[]>("users", getAllItems, {
  //   onSuccess: (items = []) => setFilteredItems(items),
  //   // enabled: true
  // });

  return (
     <FetchingState
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
    >
    <Typography variant={'h4'}>Welcome to WeShop!</Typography>

    <Grid container columnSpacing={2} height='inherit'>
      <Grid item xs={9} height='inherit' overflow='auto'>
          <Paper variant="outlined">
            <Grid container spacing={2} padding={2} height='inherit'>
            {itemsList?.map((item: ItemDetails) => (
                <Grid item xs={3} key={item._id}>
                  <ItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <FilterProducts
          allItems={[]}
          setFilteredItems={setFilteredItems}
        />
      </Grid>
    </Grid>

    <Pagination count={totalCount} color="primary" onChange={handlePageChange}/>
  </FetchingState>
  );
};

export default Home;
