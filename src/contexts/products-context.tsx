import { getProduct } from "@/services/products";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ProductsContextType {
  products: ProductData[];
}

interface ProductsProviderProps {
  children: ReactNode;
}
export const ProductsContext = createContext({} as ProductsContextType);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<ProductData[]>([]);

  async function fetchProducts() {
    const response = await getProduct();

    setProducts(response.data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products: products }}>
      {children}
    </ProductsContext.Provider>
  );
}
