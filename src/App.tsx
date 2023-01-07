import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/Home";
import Profile from "./components/Profile";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

// use this enum to make links to pages
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
  //TODO: add here the appBar and route only the inner component (to make the appBar stay while moving among pages)
  return <RouterProvider router={router} />;
};

export default App;
