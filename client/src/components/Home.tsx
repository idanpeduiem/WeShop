import { useState } from "react";
import { Card } from "@mui/material";
import { useQuery } from "react-query";

import ItemCard from "./common/ItemCard";
import "./Home.css";
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
      <div className="HomeContainer">
        <div className="title">Welcome to WeShop</div>
        <div className="content">
          <FilterProducts
            allItems={items}
            setFilteredItems={setFilteredItems}
          />
          <Card className="itemsContainer">
            {filteredItems?.map((item: ItemDetails) => {
              return <ItemCard key={item._id} item={item} />;
            })}
          </Card>
        </div>
      </div>
    </FetchingState>
  );
};

export default Home;
