import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1f2020",
      paper: "#3c3c3c",
    },
    primary: { main: "#fff" },
    text: { discount: "#57A6A1" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        elevation1: { backgroundImage: "none" },
        elevation2: { backgroundImage: "none" },
        elevation3: { backgroundImage: "none" },
        elevation4: { backgroundImage: "none" },
        elevation5: { backgroundImage: "none" },
        elevation8: { backgroundImage: "none" },
        elevation7: { backgroundImage: "none" },
        elevation24: { backgroundImage: "none" },
      },
    },
  },
});

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#121212",
    },
    background: {
      default: "#e7ecf1",
    },
    text: {
      primary: "#040D12",
      discount: "red",
    },
  },
});
