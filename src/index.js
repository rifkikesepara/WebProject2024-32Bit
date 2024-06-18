import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Theme from "./Context/Theme";
import AlertProvider, { AlertPopUp } from "./Context/AlertProvider";
import Test from "./Pages/Test";
import { SnackbarProvider } from "notistack";
import { ProductSnackbar } from "./Components/ProductSnackbar";
import ProductProvider from "./Context/ProductProvider";
import TimerProvider from "./Context/TimerProvider";
import "./config";
import { CircularProgress, Stack } from "@mui/material";
import VirtualKeyboard from "./Components/VirtualKeyboard";

//Code Splitting
const Login = lazy(() => import("./Pages/Login/Login"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const Sale = lazy(() => import("./Pages/Sale/Sale"));
const Payment = lazy(() => import("./Pages/Sale/Payment"));
const PaymentResult = lazy(() => import("./Pages/Sale/PaymentResult"));
const ItemReturn = lazy(() => import("./Pages/ItemReturn/ItemReturn"));
const Reports = lazy(() => import("./Pages/Reports/Reports"));
const SettingsDialog = lazy(() => import("./Components/SettingsDialog"));
const Collections = lazy(() => import("./Pages/Collections/Collections"));
const Error = lazy(() => import("./Pages/Error"));

//page paths
const router = createBrowserRouter([
  {
    path: "/*",
    element: <Error />,
    errorElement: <Error />,
  },
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
    path: "/settings",
    element: <SettingsDialog open={true} />,
  },
  {
    path: "/return",
    element: <ItemReturn />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/collections",
    element: <Collections />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
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
      <ProductProvider>
        <AlertProvider>
          <AlertPopUp />
          <TimerProvider>
            <React.Suspense
              fallback={
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"100%"}
                  height={"100vh"}
                  sx={{ backgroundColor: "background.default" }}
                >
                  <CircularProgress />
                </Stack>
              }
            >
              <RouterProvider router={router} />
            </React.Suspense>
          </TimerProvider>
        </AlertProvider>
      </ProductProvider>
    </SnackbarProvider>
  </Theme>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
