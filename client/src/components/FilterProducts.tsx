import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Paper, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { Department, Filter, ItemCategory, ItemDetails } from "../utils/types";
import { getAllCategories, getAllDepartments } from "../queries";
import InputSlider from "./InputSlider";
import Stack from "@mui/material/Stack";

interface FilterProductsProps {
  activeFilters: Filter[];
  setActiveFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  setMaxPriceFilter: React.Dispatch<React.SetStateAction<number | number[]>>;
  handleClearFilters: () => void;
  maxPriceFilter: number | number[];
}

const FILTER_SUBJECTS = {
  DEPARTMENT: "department",
  CATEGORY: "category",
};

const FilterProducts: React.FC<FilterProductsProps> = (props): JSX.Element => {
  const { activeFilters, setActiveFilters, setMaxPriceFilter, handleClearFilters, maxPriceFilter } = props;

  const { 
    data: departments,
    isError: isDepartError,
    isSuccess: isDepartSuccess, 
    isLoading: isDepartLoading } 
    = useQuery("departments", getAllDepartments);

  const { 
    data: categories,
    isError: isCategError,
    isSuccess: isCategSuccess, 
    isLoading: isCategLoading } 
    = useQuery("categories", getAllCategories);

  const handleChangeFilter = (newFilter: Filter) => {
    setActiveFilters((prevActiveFilters: Filter[]) => {
      let index = prevActiveFilters.findIndex(
        (filter: Filter) => filter.filterSubject === newFilter.filterSubject
      );
      if (index === -1) {
        return [...prevActiveFilters, newFilter];
      } else {
        return prevActiveFilters.map((filter: Filter) =>
          filter.filterSubject === newFilter.filterSubject ? newFilter : filter
        );
      }
    });
  };

  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack spacing={1} alignItems={"stretch"}>
        <Typography>Filter By Gender</Typography>
        {departments?.map((department: Department) => (
          <Button
            variant={
              activeFilters.some(
                (filter) =>
                  filter.filterSubject === FILTER_SUBJECTS.DEPARTMENT &&
                  filter.filterValue === department._id
              )
                ? "contained"
                : "text"
            }
            key={department._id}
            onClick={() =>
              handleChangeFilter({
                filterSubject: FILTER_SUBJECTS.DEPARTMENT,
                filterValue: department._id,
              })
            }
          >
            {department.description}
          </Button>
        ))}
        <Divider />
        <Typography>Filter By Category</Typography>
        {categories?.map((category: ItemCategory) => (
          <Button
            variant={
              activeFilters.some(
                (filter) =>
                  filter.filterSubject === FILTER_SUBJECTS.CATEGORY &&
                  filter.filterValue === category._id
              )
                ? "contained"
                : "text"
            }
            key={category._id}
            onClick={() =>
              handleChangeFilter({
                filterSubject: FILTER_SUBJECTS.CATEGORY,
                filterValue: category._id,
              })
            }
          >
            {category.description}
          </Button>
        ))}
        <Divider />
        <Typography>Max Price</Typography>
        <InputSlider
          changeMaxPrice={setMaxPriceFilter}
          maxPriceFilter={maxPriceFilter}
        />
        <Divider/>
        <Button color={"secondary"} variant={'outlined'} onClick={handleClearFilters}>Clear</Button>
      </Stack>
    </Paper>
  );
};

export default FilterProducts;
