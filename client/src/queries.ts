import AxiosInstance from "./utils/axiosInstance";
import { Cart, CartItem, ItemDetails } from "./utils/types";
import { User } from "firebase/auth";
import { wishlistItem } from "./controller/wishlistController/wishlistProvider";

// items

export const getAllItems = async (activePage: number) =>
  await AxiosInstance.get(`/items?page=${activePage}`)
    .then((itemsRes) => itemsRes.data)
    .catch(() => []);

export const getNumOfPages = async () =>
await AxiosInstance.get('/items/numOfPages')
  .then((numOfPagesRes) => numOfPagesRes.data)
  .catch(() => []);

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

export const getItemsFromCart = (userId: User["uid"]): Promise<Cart["items"]> =>
  AxiosInstance.get(`/carts/items/${userId}`)
    .then((itemData) => itemData.data)
    .catch(() => []);

export const addItemToCart = async (cartItem: CartItem) =>
  await AxiosInstance.post(`/carts/addItem`, { ...cartItem }).catch(
    () => new Error("something went wrong")
  );

// wishlist

export const getItemsFromWishlist = (
  userId: User["uid"]
): Promise<ItemDetails[]> =>
  AxiosInstance.get(`/wish-lists/items/${userId}`)
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
