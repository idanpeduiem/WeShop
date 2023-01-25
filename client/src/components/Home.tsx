import { useState } from "react";
import { Card } from "@mui/material";
import { useQuery } from "react-query";

import ItemCard from "./common/ItemCard";
import "./Home.css";
import { getAllItems } from "../queries";
import { ItemDetails } from "../utils/types";
import FilterProducts from "./FilterProducts";

const Home = () => {
  const [filteredItems, setFilteredItems] = useState<ItemDetails[]>([]);

  const { data: items = [], isLoading } = useQuery<ItemDetails[]>(
    "users",
    getAllItems,
    {
      onSuccess: (items = []) => setFilteredItems(items),
    }
  );

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="HomeContainer">
          <div className="title">Welcome to WeShop</div>
          <div className="content">
            <FilterProducts
              allItems={items}
              setFilteredItems={setFilteredItems}
            />
            <Card className="itemsContainer">
              {filteredItems.map((item) => {
                return <ItemCard key={item._id} item={item} />;
              })}
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
