import Home from "./components/Home";
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
import PrivateRoute from "./utils/PrivateRoute";

// use this enum to make links to pages
export enum RoutePaths {
  HOME = "/",
  CART = "cart",
  LOGIN = "login",
  SIGNUP = "signup",
  PROFILE = "profile",
  PRODUCT_DETAILS = "product-details/:id",
  PRODUCT_DETAILS_NO_ID = "product-details",
  PERSONAL_DETAILS = "personal-details",
  PERSONAL_ORDER = "persona-orders",
}

const App = () => {
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
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path={RoutePaths.CART}
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path={RoutePaths.PRODUCT_DETAILS}
              element={
                <PrivateRoute>
                  <ProductDetails />
                </PrivateRoute>
              }
            />
            <Route
              path={RoutePaths.PROFILE}
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            >
              <Route
                index
                element={
                  <PrivateRoute>
                    <PersonalDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path={RoutePaths.PERSONAL_DETAILS}
                element={
                  <PrivateRoute>
                    <PersonalDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path={RoutePaths.PERSONAL_ORDER}
                element={
                  <PrivateRoute>
                    <PersonalOrders />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
