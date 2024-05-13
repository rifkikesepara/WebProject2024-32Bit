import { useContext } from "react";
import { ThemeContext } from "../Context/Theme";

export default function usePreferences() {
  return useContext(ThemeContext);
}
