import { useContext } from "react";
import { AlertContext } from "../Context/AlertProvider";

export function useAlert() {
  return useContext(AlertContext);
}
