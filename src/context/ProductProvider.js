import { createContext, useMemo, useState } from "react";

export const ProductContext = createContext({
  products: [],
  setProducts: () => {},
  getAllProducts: () => [{}],
  getCategorizedProducts: (category) => [{}],
  getSubCategories: (category) => ["", ""],
});

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

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
