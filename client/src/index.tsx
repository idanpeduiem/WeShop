import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Import the functions you need from the SDKs you need
import { SnackbarProvider } from "notistack";
import theme from "./overrieds/MuiTheme";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { firebase } from "./utils/firebase";
import { UserProvider } from "./controller/userController/userProvider";
import { CartProvider } from "./controller/cartController/cartProvider";

firebase.init();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SnackbarProvider maxSnack={3}>
          <CartProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
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
