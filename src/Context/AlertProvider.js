import { Alert, Snackbar, duration } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useAlert } from "../Hooks/useAlert";

export const AlertContext = createContext({
  alert: "",
  setAlert: ({ text = "Test", type = "success", duration = 2000 }) => {},
});

export const AlertPopUp = () => {
  const { alert, setAlert } = useAlert();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setAlert({ ...alert, text: "" });
  };
  console.log(alert.duration);

  return (
    <Snackbar
      open={alert.text != "" || open ? true : false}
      autoHideDuration={alert.duration}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert sx={{ color: "white" }} severity={alert.type} variant="filled">
        {alert.text}
      </Alert>
    </Snackbar>
  );
};

export default function AlertProvider({ children }) {
  const defaultAlert = {
    text: "",
    type: "",
    duration: 2000,
  };
  const [alert, idicateAlert] = useState(defaultAlert);
  const setAlert = (object) => idicateAlert({ ...defaultAlert, ...object });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
