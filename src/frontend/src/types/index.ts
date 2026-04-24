import type {
  Category,
  Order,
  OrderItem,
  OrderItemInput,
  OrderStatus,
  Product,
} from "../backend.d.ts";

export type {
  Category,
  Order,
  OrderItem,
  OrderItemInput,
  Product,
  OrderStatus,
};

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AdminState {
  token: string | null;
  isAuthenticated: boolean;
}

export interface ProductFilters {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  searchQuery: string;
}
