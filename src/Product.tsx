import { ProductType } from "./ProductsProvider";
import { ReducerActionType, ReducerAction } from "./CartProvider";
import { ReactElement, memo } from "react";

type Props = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: Props): ReactElement => {
  const img: string = new URL(`/${product.id}.jpg`, import.meta.url).href;

  const onAddToCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, quantity: 1 },
    });

  const itemInCart = inCart ? "-> Item In Cart" : null;

  return (
    <article className="product">
      <h3>{product.name}</h3>
      <img className="product__img" src={img} alt="Image" />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}{" "}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>ADD to Cart</button>
    </article>
  );
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: Props,
  { product: nextProduct, inCart: nextInCart }: Props
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
