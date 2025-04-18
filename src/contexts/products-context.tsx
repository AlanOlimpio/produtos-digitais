import { getProduct } from "@/services/products";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface ProductsContextType {
  products: ProductData[];
}

interface ProductsProviderProps {
  children: ReactNode;
}

export interface urlParamsProps {
  q?: string;
}

export const ProductsContext = createContext({} as ProductsContextType);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("q") ? searchParams.get("q") : undefined;

  async function fetchProducts() {
    let urlParams: urlParamsProps = {};

    if (querySearch) {
      urlParams = {
        ...urlParams,
        q: querySearch,
      };
    }
    const response = await getProduct(urlParams);

    setProducts(response.data);
  }

  useEffect(() => {
    fetchProducts();
  }, [querySearch]);

  return (
    <ProductsContext.Provider value={{ products: products }}>
      {children}
    </ProductsContext.Provider>
  );
}
