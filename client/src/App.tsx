import React from "react";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { Container, ThemeProvider } from "@mui/material";
import theme from "./overrieds/MuiTheme";
import Navbar from "./components/AppBar";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PersonalDetails from "./components/PersonalDetails";
import PersonalOrders from "./components/PersonalOrders";

// use this enum to make links to pages
export enum RoutePaths {
  HOME = "/",
  CART = "cart",
  PROFILE = "profile",
  PRODUCT_DETAILS = "product-details",
  PERSONAL_DETAILS = "personal-details",
  PERSONAL_ORDER = "persona-orders",
}

const App = () => {
  //TODO: add here the appBar and route only the inner component (to make the appBar stay while moving among pages)
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container>
        <Router>
          <Routes>
            <Route path={RoutePaths.HOME} element={<Home />} />
            <Route path={RoutePaths.CART} element={<Cart />} />
            <Route
              path={RoutePaths.PRODUCT_DETAILS}
              element={<ProductDetails />}
            />
            <Route path={RoutePaths.PROFILE} element={<Profile />}>
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
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
