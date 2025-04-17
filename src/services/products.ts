import { api } from "../lib/axios";

export function getProduct() {
  return api.get("products");
}
