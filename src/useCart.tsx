import { useContext } from "react";
import CartContext from "./CartProvider";
import { UseCartContextType } from "./CartProvider";

const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default useCart;
