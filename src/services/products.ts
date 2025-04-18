import { urlParamsProps } from "@/contexts/products-context";
import { api } from "../lib/axios";

export function getProduct(urlParams: urlParamsProps) {
  return api.get("products", { params: urlParams });
}
