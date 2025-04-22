type BrandData = {
  id: string;
  name: string;
};
type ProductData = {
  id: string;
  image: string;
  name: string;
  price: number;
  brand: BrandData;
  description?: string;
};

type CreateProduct = Omit<ProductData, "id" | "description">;
