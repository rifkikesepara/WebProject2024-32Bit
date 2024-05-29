import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useAlert } from "../Hooks/useAlert";

export const AlertContext = createContext({
  alert: "",
  setAlert: ({ text = "Test", type = "success" }) => {},
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

  return (
    <Snackbar
      open={alert.text != "" || open ? true : false}
      autoHideDuration={2000}
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
  const [alert, setAlert] = useState({ text: "", type: "" });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
