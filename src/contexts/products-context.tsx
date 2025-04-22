import { getProduct, registerProduct } from "@/services/products";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface ProductsContextType {
  products: ProductData[];
  createProduct: (data: CreateProduct) => Promise<void>;
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

  async function createProduct(data: CreateProduct) {
    const response = await registerProduct(data);

    setProducts((state) => [response.data, ...state]);
  }

  useEffect(() => {
    fetchProducts();
  }, [querySearch]);

  return (
    <ProductsContext.Provider value={{ products: products, createProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}
