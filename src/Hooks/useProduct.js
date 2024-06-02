import { useContext } from "react";
import { ProductContext } from "../Context/ProductProvider";

export default function useProduct() {
  return useContext(ProductContext);
}
