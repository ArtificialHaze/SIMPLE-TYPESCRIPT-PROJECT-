import { useContext } from "react";
import ProductsContext from "./ProductsProvider";
import { UseProductsContextType } from "./ProductsProvider";

const useProducts = (): UseProductsContextType => {
  return useContext(ProductsContext);
};

export default useProducts;
