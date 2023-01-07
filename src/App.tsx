import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/Home";
import Profile from "./components/Profile";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

export enum Routes {
  HOME = "/",
  CART = "/cart",
  PROFILE = "/profile",
  PRODUCT_DETAILS = "/product-details",
}

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <HomePage />,
  },
  {
    path: Routes.CART,
    element: <Cart />,
  },
  {
    path: Routes.PROFILE,
    element: <Profile />,
  },
  {
    path: Routes.PRODUCT_DETAILS,
    element: <ProductDetails />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
