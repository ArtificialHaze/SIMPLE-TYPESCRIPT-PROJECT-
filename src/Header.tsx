import Nav from "./Nav";
import useCart from "./useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  const content = (
    <header className="header">
      <div className="header__title-bar">
        <h1>Logitech Co.</h1>
        <div className="header__price-box">
          <p>Total items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
        <Nav viewCart={viewCart} setViewCart={setViewCart} />
      </div>
    </header>
  );
  return content;
};

export default Header;
