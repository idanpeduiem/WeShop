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
  const [filteredItems, setFilteredItems] = useState<ItemDetails[]>();

  const {
    data: items,
    isLoading,
    isError,
    isSuccess,
  } = useQuery("users", getAllItems, {
    onSuccess: (items) => setFilteredItems(items),
  });
  console.log(items);

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
              const { _id, description, price, image } = item;
              return (
                <ItemCard
                  key={_id}
                  name={description}
                  price={price}
                  imageUrl={image}
                />
              );
            })}
          </Card>
        </div>
      </div>
    </FetchingState>
  );
};

export default Home;
