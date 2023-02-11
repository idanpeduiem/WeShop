import { ChangeEvent, useState } from "react";
import { Grid, Pagination, Paper, Typography } from "@mui/material";
import { useQuery } from "react-query";

import ItemCard from "./common/ItemCard";
import { getAllItems, getNumOfPages } from "../queries";
import { Filter, ItemDetails } from "../utils/types";
import FilterProducts from "./FilterProducts";
import FetchingState from "../utils/fetchingState";
import { useUserContext } from "../controller/userController/userContext";

const Home = () => {
  const { user } = useUserContext();
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | number[]>(1000);

  const [activePage, setActivePage] = useState<number>(0);

  const {
    data: itemsList,
    isError,
    isLoading,
    isSuccess,
  } = useQuery<ItemDetails[]>(
    ["items", activePage, activeFilters, maxPriceFilter],
    () => getAllItems(activePage, activeFilters, maxPriceFilter),
    {
      keepPreviousData: true,
    }
  );

  const { data: numOfPages } = useQuery<number>(
    ["numOfPages", activeFilters, maxPriceFilter],
    () => getNumOfPages(activeFilters, maxPriceFilter),
    {
      onSuccess: () => setActivePage(0)
    }
  );

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setActivePage(page - 1);
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setMaxPriceFilter(1000);
    setActivePage(0);
  };

  return (
    <FetchingState
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
    >
      <Typography variant={"h4"}>
        Welcome to WeShop {user?.displayName}
      </Typography>

      <Grid container columnSpacing={2} height="inherit">
        <Grid item xs={9} height="inherit" overflow="auto">
          <Paper variant="outlined">
            <Grid container spacing={2} padding={2} height="inherit">
              {itemsList?.map((item: ItemDetails) => (
                <Grid item xs={3} key={item._id}>
                  <ItemCard item={item} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3} height="inherit" overflow="auto">
          <FilterProducts
            maxPriceFilter={maxPriceFilter}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            setMaxPriceFilter={setMaxPriceFilter}
            handleClearFilters={handleClearFilters}
          />
        </Grid>
      </Grid>

      <Pagination
        count={numOfPages}
        page={activePage+1}
        color="primary"
        onChange={handlePageChange}
      />
    </FetchingState>
  );
};

export default Home;
