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
