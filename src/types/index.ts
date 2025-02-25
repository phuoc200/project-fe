export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  category: "lte" | "scientific" | "medical";
  image: string;
  description: string | null;
  createdAt: string;
}

export type SortOption =
  | "best-selling"
  | "alphabetically-asc"
  | "alphabetically-desc"
  | "price-asc"
  | "price-desc"
  | "date-asc"
  | "date-desc";

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderNote {
  cartId: string;
  note: string;
}

export interface PaginatedProducts {
  totalProducts: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  products: Product[];
}
