import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import theme from "./overrieds/MuiTheme";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { firebase } from "./utils/firebase";
import { UserProvider } from "./controller/userController/userProvider";
import { CartProvider } from "./controller/cartController/cartProvider";
import WishlistProvider from "./controller/wishlistController/wishlistProvider";

firebase.init();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SnackbarProvider maxSnack={3}>
          <CartProvider>
            <WishlistProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
            </WishlistProvider>
          </CartProvider>
        </SnackbarProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
