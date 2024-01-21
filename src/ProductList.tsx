import useCart from "./useCart";
import useProducts from "./useProducts";
import { UseProductsContextType } from "./ProductsProvider";
import { ReactElement } from "react";
import Product from "./Product";

type Props = {};

const ProductList = (props: Props) => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading..</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.id === product.id);

      return (
        <Product
          key={product.id}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  return <main className="main main--products">{pageContent}</main>;
};

export default ProductList;
