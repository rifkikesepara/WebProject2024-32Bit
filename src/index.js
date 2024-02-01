import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import Login from "./pages/Login";
import Theme from "./context/Theme";
import AlertProvider, { AlertPopUp } from "./context/AlertProvider";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <MainScreen />,
  },
  {
    path: "/",
    element: <Login />,
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
