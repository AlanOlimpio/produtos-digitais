import { perPage, urlParamsProps } from "@/stores/use-products-store";
import { api } from "../lib/axios";

export function getProduct(urlParams: urlParamsProps) {
  return api.get(`products?_limit=${perPage}`, {
    params: { ...urlParams, _sort: "id", _order: "desc" },
  });
}

export async function registerProduct({
  brand,
  image,
  name,
  price,
}: CreateProduct) {
  const response = await api.post("/products", { brand, image, name, price });
  return response;
}
