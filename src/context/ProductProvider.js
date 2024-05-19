import { createContext, useMemo, useState } from "react";
import API from "../productsAPI.json";
import useData from "../Hooks/useData";
import LOG from "../Debug/Console";

export const ProductContext = createContext({
  products: [],
  setProducts: () => {},
  getAllProducts: () => [{}],
  getCategorizedProducts: (category) => [{}],
  getSubCategories: (category) => ["", ""],
});

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useData(
    Object.values(API),
    (data) => {
      LOG("fetching all products...", "red");
      setProducts(data);
    },
    () => {},
    [API]
  );

  const getAllProducts = () => {
    var array = [];
    products.map(({ children }) =>
      children.map(({ products }) => array.push(...products))
    );
    return array;
  };

  const getCategorizedProducts = (category) => {
    let array = [];
    getAllProducts().map((product) => {
      product.categories.map((data) => {
        if (data.id == category) {
          array.push(product);
        }
      });
    });
    return array;
  };

  const getSubCategories = (category) => {
    let array = [];
    products.map(({ children }) => {
      children.map((data) => {
        if (data.parentId === category) {
          array.push({ name: data.name, value: data.id });
        }
      });
    });
    return array;
  };

  const values = useMemo(
    () => ({
      products,
      setProducts,
      getAllProducts,
      getCategorizedProducts,
      getSubCategories,
    }),
    [products]
  );
  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
}
