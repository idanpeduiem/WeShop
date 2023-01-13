import React from "react";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { Container } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/AppBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PersonalDetails from "./components/PersonalDetails";
import PersonalOrders from "./components/PersonalOrders";

// use this enum to make links to pages
export enum RoutePaths {
  HOME = "/",
  CART = "cart",
  LOGIN = "login",
  SIGNUP = "signup",
  PROFILE = "profile",
  PRODUCT_DETAILS = "product-details",
  PERSONAL_DETAILS = "personal-details",
  PERSONAL_ORDER = "persona-orders",
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path={RoutePaths.LOGIN} element={<Login />} />
          <Route path={RoutePaths.SIGNUP} element={<Signup />} />
          <Route path={RoutePaths.HOME} element={<Home />} />
          <Route path={RoutePaths.CART} element={<Cart />} />
          <Route
            path={RoutePaths.PRODUCT_DETAILS}
            element={<ProductDetails />}
          />
          <Route path={RoutePaths.PROFILE} element={<Profile />}>
            <Route index element={<PersonalDetails />} />
            <Route
              path={RoutePaths.PERSONAL_DETAILS}
              element={<PersonalDetails />}
            />
            <Route
              path={RoutePaths.PERSONAL_ORDER}
              element={<PersonalOrders />}
            />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
