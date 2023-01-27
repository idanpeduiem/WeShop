import AxiosInstance from "./utils/axiosInstance";
import { ItemDetails } from "./utils/types";
import { User } from "firebase/auth";
import { CartItem } from "./controller/cartController/cartProvider";

// items

export const getAllItems = async () =>
  await AxiosInstance.get("/items")
    .then((itemsRes) => itemsRes.data)
    .catch(() => new Error(`Failed getting all products`));

export const getItemQuery = async (id: string): Promise<ItemDetails> =>
  await AxiosInstance.get(`/items/${id}`)
    .then((itemData) => itemData.data)
    .catch(() => new Error("something went wrong"));

export const getItemsFromCart = (
  userId: User["uid"]
): Promise<ItemDetails[]> =>
  AxiosInstance.get(`/carts/items/${userId}`)
    .then((itemData) => itemData.data)
    .catch(() => new Error("something went wrong"));

export const addItemToCart = async (cartItem: CartItem) =>
  await AxiosInstance.post(`/carts/addItem`, {...cartItem}).catch(
    () => new Error("something went wrong")
  );

// departments

export const getAllDepartments = async () =>
  await AxiosInstance.get("/departments")
    .then((departmentsRes) => departmentsRes.data)
    .catch(() => new Error(`Failed getting all departments`));

// categories

export const getAllCategories = async () =>
  await AxiosInstance.get("/categories")
    .then((categoriesRes) => categoriesRes.data)
    .catch(() => new Error(`Failed getting all categories`));
