export interface Product {
  id: number;
  brand: string;
  image: string;
  style: string;
  substyle: string;
  abv: string;
  origin: string;
  information: string;
  skus: Sku[];
}

interface Sku {
  code: string;
  name: string;
}
