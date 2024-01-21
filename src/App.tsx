import { useState } from "react";
import "./App.css";
import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";
import ProductList from "./ProductList";

function App() {
  const [viewCart, setviewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setviewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  );

  return content;
}

export default App;
