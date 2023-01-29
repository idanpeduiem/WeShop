import React, { useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import { useQuery } from "react-query";
import { Department, ItemCategory, ItemDetails } from "../utils/types";
import { getAllCategories, getAllDepartments } from "../queries";
import InputSlider from "./InputSlider";

interface FilterProductsProps {
  allItems: ItemDetails[];
  setFilteredItems: (items: ItemDetails[]) => void;
}

interface Filter {
  filterSubject: string;
  filterValue: string;
}

const FILTER_SUBJECTS = {
  DEPARTMENT: "department",
  CATEGORY: "category",
};

const FilterProducts: React.FC<FilterProductsProps> = (props): JSX.Element => {
  const { setFilteredItems, allItems } = props;

  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number| number[]>(1000);

  const { data: departments } = useQuery("departments", getAllDepartments);
  const { data: categories } = useQuery("categories", getAllCategories);

  const handleChangeFilter = (newFilter: Filter) => {
    setActiveFilters(prevActiveFilters => {
      let index = prevActiveFilters.findIndex((filter: Filter) => filter.filterSubject === newFilter.filterSubject);
      if(index === -1){
        return [...prevActiveFilters, newFilter];
      } else {
        return prevActiveFilters.map((filter: Filter)=> filter.filterSubject === newFilter.filterSubject ? newFilter : filter );
      }
  });
  };

  useEffect(() => {
    let itemsAfterFilter: ItemDetails[];
    if(activeFilters.length) {
      itemsAfterFilter = allItems.reduce((acc: ItemDetails[], currItem: ItemDetails) => {
        return activeFilters.every((activeFilter: Filter) => 
          (currItem[activeFilter.filterSubject as keyof ItemDetails] as ItemCategory | Department)._id === activeFilter.filterValue) ?
        [...acc,currItem] :
        acc
      }, [] as ItemDetails[]);
    } else {
      // for deleting all fiters - TODO
      itemsAfterFilter = allItems;
    }
    itemsAfterFilter = itemsAfterFilter.filter((item: ItemDetails) => item.price <= maxPriceFilter);
    setFilteredItems(itemsAfterFilter);
  },[activeFilters, maxPriceFilter]);

  return (
    <Card className="filtersContainer">
      <div>Filter By Gender</div>
      <div className="genderFilter">
        {departments?.map((department: Department) => (
          <Button
            variant={activeFilters.some(filter => filter.filterSubject === FILTER_SUBJECTS.DEPARTMENT &&
                      filter.filterValue === department._id) ? "contained" : "text"}
            key={department._id}
            onClick={() =>
              handleChangeFilter({filterSubject: FILTER_SUBJECTS.DEPARTMENT, filterValue: department._id})
            }
          >
            {department.description}
          </Button>
        ))}
      </div>

      <div>Filter By Category</div>
      <div className="genderFilter">
        {categories?.map((category: ItemCategory) => (
          <Button
            variant={activeFilters.some(filter => filter.filterSubject === FILTER_SUBJECTS.CATEGORY &&
                      filter.filterValue === category._id) ? "contained" : "text"}
            key={category._id}
            onClick={() =>
              handleChangeFilter({filterSubject: FILTER_SUBJECTS.CATEGORY, filterValue: category._id})
            }
          >
            {category.description}
          </Button>
        ))}
      </div>

      <div>Max Price</div>
      <InputSlider changeMaxPrice={setMaxPriceFilter}/>
    </Card>
  );
};

export default FilterProducts;
