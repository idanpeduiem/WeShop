import React, { createContext, useContext } from "react";
import {ItemDetails} from "../../utils/types";

interface wishlistContextProps {
    wishlistItems: ItemDetails[];
    addItem: (itemId: ItemDetails['_id']) => void
    removeItem: (itemId: ItemDetails['_id']) => void
}

const defaultValue: wishlistContextProps = {
    wishlistItems: [],
    addItem: () => {},
    removeItem: () => {},
};

export const wishlistContext = createContext<wishlistContextProps>(defaultValue);
export const useWishlistContext = () => useContext(wishlistContext);
