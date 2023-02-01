import AxiosInstance from "./utils/axiosInstance";
import { ItemDetails } from "./utils/types";
import { User } from "firebase/auth";
import { CartItem } from "./controller/cartController/cartProvider";
import { wishlistItem } from "./controller/wishlistController/wishlistProvider";

// items

export const getAllItems = async () =>
  await AxiosInstance.get("/items")
    .then((itemsRes) => itemsRes.data)
    .catch(() => []);

export const getAllItemsDesc = async () =>
  await AxiosInstance.get(`/items/desc`)
    .then((itemsRes) => itemsRes.data)
    .catch(() => []);

export const getItemQuery = async (id: string): Promise<ItemDetails> =>
  await AxiosInstance.get(`/items/${id}`)
    .then((itemData) => itemData.data)
    .catch(() => new Error("something went wrong"));

// cart

export const getItemsFromCart = (userId: User["uid"]): Promise<ItemDetails[]> =>
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
  AxiosInstance.get(`/wishlist/items/${userId}`)
    .then((itemData) => itemData.data)
    .catch(() => []);

export const addItemToWishlist = (wishlistItem: wishlistItem) =>
  AxiosInstance.post(`/wishlist/addItem`, { ...wishlistItem }).catch(() => []);

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
