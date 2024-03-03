import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import MainScreen from "./Pages/MainScreen";
import Theme from "./Context/Theme";
import AlertProvider, { AlertPopUp } from "./Context/AlertProvider";
import Sale from "./Pages/Sale";
import Test from "./Pages/Test";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <MainScreen />,
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
    path: "/test",
    element: <Test />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Theme>
      <AlertProvider>
        <AlertPopUp />
        <RouterProvider router={router} />
      </AlertProvider>
    </Theme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
