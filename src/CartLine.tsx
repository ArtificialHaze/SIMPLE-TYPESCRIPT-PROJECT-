import { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType } from "./CartProvider";
import { ReducerAction } from "./CartProvider";
import { ReducerActionType } from "./CartProvider";

type Props = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartLine = ({ item, dispatch, REDUCER_ACTIONS }: Props) => {
  const img: string = new URL(`/${item.id}.jpg`, import.meta.url).href;

  const lineTotal: number = item.quantity * item.price;

  const highestQuantity: number = 20 > item.quantity ? 20 : item.quantity;

  const optionValues: number[] = [...Array(highestQuantity).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });
  const onChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, quantity: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });

  const content = (
    <li className="cart__item">
      <img src={img} alt="Image" className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price per Item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>
      <label htmlFor="itemQuantity" className="offscreen">
        Item Quantity
      </label>
      <select
        name="itemQuantity"
        id="itemQuantity"
        className="cart__select"
        value={item.quantity}
        aria-label="Item Quantity"
        onChange={onChangeQuantity}
      >
        {options}
      </select>
      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>
      <button
        aria-label="Remove Item from Cart"
        title="Remove item from Cart"
        onClick={onRemoveFromCart}
        className="cart__button"
      >
        &times;
      </button>
    </li>
  );

  return <>{content}</>;
};

function areItemsEqual({ item: prevItem }: Props, { item: nextItem }: Props) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLine = memo<typeof CartLine>(CartLine, areItemsEqual);

export default MemoizedCartLine;
