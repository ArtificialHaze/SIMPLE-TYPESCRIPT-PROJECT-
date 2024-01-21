import { ReactElement, createContext, useEffect, useState } from "react";

export type ProductType = {
  id: string;
  name: string;
  price: number;
};

const initState: ProductType[] = [
  {
    id: "Item-01",
    name: "Normal Package",
    price: 19.99,
  },
  {
    id: "Item-02",
    name: "Premium Package",
    price: 49.99,
  },
  {
    id: "Item-03",
    name: "Deluxe Package",
    price: 99.99,
  },
];

export type UseProductsContextType = { products: ProductType[] };

const initContextState: UseProductsContextType = {
  products: [],
};

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3000/products")
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          if (error instanceof Error) console.log(error.message);
        });
      return data;
    };
    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
