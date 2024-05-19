import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { DarkTheme, LightTheme } from "../Styles/Themes";
import { Switch, ThemeProvider, useMediaQuery } from "@mui/material";

export const ThemeContext = createContext({
  theme: LightTheme, //intial theme
  isDesktop: true,
  isThemeDark: false,
  toggleTheme: () => {},
});

export default function Theme({ children }) {
  useEffect(() => {
    if (localStorage.getItem("theme") == null)
      localStorage.setItem("theme", "light");
  }, []);

  const [themeName, setThemeName] = useState(localStorage.getItem("theme"));

  let theme = themeName == "light" ? LightTheme : DarkTheme;
  let isThemeDark = themeName == "dark" ? true : false;
  let isDesktop = useMediaQuery("(min-width:1366px)");

  const toggleTheme = useCallback(() => {
    if (themeName == "light") {
      setThemeName("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setThemeName("light");
      localStorage.setItem("theme", "light");
    }
  }, [themeName]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      themeName,
      theme,
      isThemeDark,
      isDesktop,
    }),
    [toggleTheme, themeName, theme, isThemeDark, isDesktop]
  );

  return (
    <ThemeContext.Provider value={preferences}>
      <ThemeProvider theme={theme}>
        <Switch
          checked={isThemeDark}
          sx={{ position: "absolute", right: 0, zIndex: 1000 }}
          onChange={(e, checked) => {
            toggleTheme();
          }}
        />

        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
