import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: { main: "#fff" },
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
    },
  },
});
