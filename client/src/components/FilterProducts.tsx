import React from "react";
import { Button, Card } from "@mui/material";
import { useQuery } from "react-query";

import { Department, ItemCategory, ItemDetails } from "../utils/types";
import { getAllCategories, getAllDepartments } from "../queries";

interface FilterProductsProps {
    allItems: ItemDetails[];
    setFilteredItems: (items: ItemDetails[]) => void;
}

const FILTER_SUBJECTS = {
    DEPARTMENT: 'department',
    CATEGORY: 'category'
}

const FilterProducts: React.FC<FilterProductsProps> = (props): JSX.Element => {
    const { setFilteredItems, allItems } = props;
    const {data: departments} = useQuery("departments", getAllDepartments);
    const {data: categories} = useQuery("categories", getAllCategories);


    const getFilteredProducts = (filterSubject: string, filterValue: string) => {
        //@ts-ignore
        setFilteredItems(allItems.filter((item: ItemDetails) => item[filterSubject]._id === filterValue ));
    }

  return (
          <Card className="filtersContainer">
            <div>מסננים:</div>
            <div className="genderFilter">
                {
                    departments.map((department: Department) => 
                        <Button 
                            variant="text" 
                            key={department._id}
                            onClick={() => getFilteredProducts(FILTER_SUBJECTS.DEPARTMENT, department._id)}
                        >
                            {department.description}
                        </Button>
                    )
                }
            </div>

            <div>סינונים נוספים:</div>
            <div className="genderFilter">
                {
                    categories.map((category: ItemCategory) => 
                        <Button 
                            variant="text" 
                            key={category._id}
                            onClick={() => getFilteredProducts(FILTER_SUBJECTS.CATEGORY, category._id)}
                            >
                            {category.description}
                        </Button>
                    )
                }
            </div>
          </Card>
  );
};

export default FilterProducts;
