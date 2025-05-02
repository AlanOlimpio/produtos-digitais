import { create } from "zustand";
import { getProduct, registerProduct } from "@/services/products";

export interface urlParamsProps {
  _page?: number;
  q?: string;
}

export const perPage = 5;

interface ProductsStore {
  products: ProductData[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  fetchProducts: (params: urlParamsProps) => Promise<void>;
  createProduct: (data: CreateProduct) => Promise<void>;
  setProducts: (products: ProductData[]) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  totalCount: 0,
  isLoading: true,
  isError: false,

  setProducts: (products) => set({ products }),

  fetchProducts: async (params: urlParamsProps) => {
    try {
      set({ isLoading: true, isError: false });
      const response = await getProduct(params);
      set({
        products: response.data,
        totalCount: parseInt(response.headers["x-total-count"] || "0"),
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      set({ isLoading: false, isError: true });
    }
  },

  createProduct: async (data: CreateProduct) => {
    const response = await registerProduct(data);
    set((state) => ({
      products: [response.data, ...state.products],
    }));
  },
}));
