import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const lightTheme = {
  background: "white",
};
const darkTheme = {
  background: "black",
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export function usePreferences() {
  return useContext(ThemeContext);
}

export default function Theme({ children }) {
  useEffect(() => {
    if (localStorage.getItem("theme") == null)
      localStorage.setItem("theme", "light");
  }, []);

  const [themeName, setThemeName] = useState(localStorage.getItem("theme"));

  let theme = themeName == "light" ? lightTheme : darkTheme;
  let isThemeDark = themeName == "dark" ? true : false;

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
    }),
    [toggleTheme, themeName, theme, isThemeDark]
  );

  return (
    <ThemeContext.Provider value={preferences}>
      {children}
    </ThemeContext.Provider>
  );
}
