import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Theme, { usePreferences } from "./Context/Theme";
import AlertProvider, { AlertPopUp } from "./Context/AlertProvider";
import Sale from "./Pages/Sale";
import Test from "./Pages/Test";
import { SnackbarProvider } from "notistack";
import { ProductSnackbar } from "./Components/ProductSnackbar";
import Payment from "./Pages/Payment";
import PaymentResult from "./Pages/PaymentResult";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/sale",
    element: <Sale />,
  },
  {
    path: "/sale/payment",
    element: <Payment />,
  },
  {
    path: "/sale/payment/result",
    element: <PaymentResult />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Theme>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        maxSnack={1}
        Components={{
          product: ProductSnackbar,
        }}
        preventDuplicate
        autoHideDuration={1000}
      >
        <AlertProvider>
          <AlertPopUp />
          <RouterProvider router={router} />
        </AlertProvider>
      </SnackbarProvider>
    </Theme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
