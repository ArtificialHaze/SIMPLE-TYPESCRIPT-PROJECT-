import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartProvider } from "./CartProvider";
import { ProductsProvider } from "./ProductsProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ProductsProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ProductsProvider>
);
