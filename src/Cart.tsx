import { useState } from "react";
import useCart from "./useCart";
import CartLine from "./CartLine";

type Props = {};

const Cart = (props: Props) => {
  const [confirm, setConfirm] = useState<boolean>(false);

  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const content = confirm ? (
    <h2>Thank you for your Order!</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLine
              key={item.id}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          onClick={onSubmitOrder}
          className="cart__submit"
          disabled={!totalItems}
        >
          Place Order
        </button>
      </div>
    </>
  );

  return <main className="main main--cart">{content}</main>;
};

export default Cart;
