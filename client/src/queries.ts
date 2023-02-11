import AxiosInstance from "./utils/axiosInstance";
import { Cart, CartItem, Filter, ItemDetails } from "./utils/types";
import { User } from "firebase/auth";
import { wishlistItem } from "./controller/wishlistController/wishlistProvider";
import { Axios } from "axios";

// items

export const getAllItems = async (activePage: number, activeFilters: Filter[], maxPriceFilter: number | number[]) => {
  const filtersQuery: string = activeFilters.reduce(
    (acc: string, filter: Filter) =>  acc.concat(`&${filter.filterSubject}=${filter.filterValue}`), '');

  return AxiosInstance.get(`/items?page=${activePage}${filtersQuery}&maxPrice=${maxPriceFilter}`)
    .then((itemsRes) => itemsRes.data)
    .catch(() => []);
}

export const getNumOfPages = async (activeFilters: Filter[], maxPriceFilter: number | number[]) => {
  const filtersQuery: string = activeFilters.reduce(
    (acc: string, filter: Filter) => acc.concat(`${filter.filterSubject}=${filter.filterValue}&`), '');

  return AxiosInstance.get(`/items/numOfPages?${filtersQuery}&maxPrice=${maxPriceFilter}`)
  .then((numOfPagesRes) => numOfPagesRes.data)
  .catch(() => []);
}

export const getAllItemsDesc = async (searchStr: string) => {
  const { data } = await AxiosInstance.get(`/items/desc?search=` + searchStr);
  return data;
};

export const getGraphData = async () => {
  const { data } = await AxiosInstance.get(`/items/graphdata`);
  return data;
};

export const getItemQuery = async (id: string): Promise<ItemDetails> =>
  await AxiosInstance.get(`/items/${id}`)
    .then((itemData) => itemData.data)
    .catch(() => new Error("something went wrong"));

// cart

export const getItemsFromCart = () =>
  AxiosInstance.get(`/carts/items/`)
    .then((itemData) => itemData.data)
    .catch(() => []);

export const addItemToCart = async (cartItem: CartItem) =>
  await AxiosInstance.post(`/carts/addItem`, { ...cartItem }).catch(
    () => new Error("something went wrong")
  );

export const getCartTotalValue = () =>
     AxiosInstance.get('/carts/totalValue')
    .then(valueResp => valueResp.data)
    .catch(() =>  new Error('couldnt get cart value'));


// wishlist

export const getItemsFromWishlist = (): Promise<ItemDetails[]> =>
  AxiosInstance.get(`/wish-lists/items/`)
    .then((itemData) => itemData.data)
    .catch(() => []);

export const addItemToWishlist = (wishlistItem: wishlistItem) =>
  AxiosInstance.post(`/wish-lists/addItem`, { ...wishlistItem });

// departments

export const getAllDepartments = async () =>
  await AxiosInstance.get("/departments")
    .then((departmentsRes) => departmentsRes.data)
    .catch(() => []);

// categories

export const getAllCategories = async () =>
  await AxiosInstance.get("/categories")
    .then((categoriesRes) => categoriesRes.data)
    .catch(() => []);

// orders
export const getAllUserOrders = async () =>
  await AxiosInstance.get("/orders")
    .then((ordersRes) => ordersRes.data)
    .catch(() => []);

export const saveOrder = async (address: string) =>
 await AxiosInstance.post("/orders", {address})
 .catch(() => new Error('couldnt save order'));
