import React from "react";
import Home from "./components/Home";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./components/Home";
import Profile from "./components/Profile";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { Box, Container } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/AppBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PersonalDetails from "./components/PersonalDetails";
import PersonalOrders from "./components/PersonalOrders";
import { useUserContext } from "./controller/userController/userContext";
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
  const { user } = useUserContext();

  return (
    <Router>
      <Navbar />
      <Box marginTop={5}>
        <Container>
          <Routes>
            <Route path={RoutePaths.LOGIN} element={<Login />} />
            <Route path={RoutePaths.SIGNUP} element={<Signup />} />
            <Route
              path={RoutePaths.HOME}
              element={user ? <Home /> : <Login />}
            />
            <Route
              path={RoutePaths.CART}
              element={user ? <Cart /> : <Login />}
            />
            <Route
              path={RoutePaths.PRODUCT_DETAILS}
              element={user ? <ProductDetails /> : <Login />}
            />
            <Route
              path={RoutePaths.PROFILE}
              element={user ? <Profile /> : <Login />}
            >
              <Route index element={user ? <PersonalDetails /> : <Login />} />
              <Route
                path={RoutePaths.PERSONAL_DETAILS}
                element={user ? <PersonalDetails /> : <Login />}
              />
              <Route
                path={RoutePaths.PERSONAL_ORDER}
                element={user ? <PersonalOrders /> : <Login />}
              />
            </Route>
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
