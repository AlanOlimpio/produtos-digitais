import { getProduct, registerProduct } from "@/services/products";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface ProductsContextType {
  products: ProductData[];
  createProduct: (data: CreateProduct) => Promise<void>;
  onPageChange: (pageIndex: number) => Promise<void> | void;
  totalCount: number;
}

interface ProductsProviderProps {
  children: ReactNode;
}

export interface urlParamsProps {
  _page?: number;
  q?: string;
}
export const perPage = 10;

export const ProductsContext = createContext({} as ProductsContextType);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const querySearch = searchParams.get("q") ? searchParams.get("q") : undefined;

  async function fetchProducts() {
    let urlParams: urlParamsProps = {};

    if (querySearch) {
      urlParams = {
        ...urlParams,
        q: querySearch,
      };
    }
    if (page) {
      urlParams = {
        ...urlParams,
        _page: page,
      };
    }

    const response = await getProduct(urlParams);
    setTotal(response.headers["x-total-count"]);
    setProducts(response.data);
  }

  async function createProduct(data: CreateProduct) {
    const response = await registerProduct(data);

    setProducts((state) => [response.data, ...state]);
  }

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  useEffect(() => {
    fetchProducts();
  }, [page, querySearch]);

  return (
    <ProductsContext.Provider
      value={{
        products: products,
        createProduct,
        totalCount: total,
        onPageChange: handlePaginate,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
