import { create } from "zustand";
import type { CartItem, Product } from "../types";

interface CartStore {
  cartItems: CartItem[];
  cartTotal: number;
  cartCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: bigint) => void;
  updateQuantity: (productId: bigint, quantity: number) => void;
  clearCart: () => void;
}

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem("uday_cart");
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  localStorage.setItem("uday_cart", JSON.stringify(items));
}

function calcTotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
}

function calcCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

const initialItems = loadCart();

export const useCartStore = create<CartStore>((set) => ({
  cartItems: initialItems,
  cartTotal: calcTotal(initialItems),
  cartCount: calcCount(initialItems),

  addToCart: (product: Product) => {
    set((state) => {
      const existing = state.cartItems.find(
        (i) => i.product.id.toString() === product.id.toString(),
      );
      let updated: CartItem[];
      if (existing) {
        updated = state.cartItems.map((i) =>
          i.product.id.toString() === product.id.toString()
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      } else {
        updated = [...state.cartItems, { product, quantity: 1 }];
      }
      saveCart(updated);
      return {
        cartItems: updated,
        cartTotal: calcTotal(updated),
        cartCount: calcCount(updated),
      };
    });
  },

  removeFromCart: (productId: bigint) => {
    set((state) => {
      const updated = state.cartItems.filter(
        (i) => i.product.id.toString() !== productId.toString(),
      );
      saveCart(updated);
      return {
        cartItems: updated,
        cartTotal: calcTotal(updated),
        cartCount: calcCount(updated),
      };
    });
  },

  updateQuantity: (productId: bigint, quantity: number) => {
    set((state) => {
      const updated =
        quantity <= 0
          ? state.cartItems.filter(
              (i) => i.product.id.toString() !== productId.toString(),
            )
          : state.cartItems.map((i) =>
              i.product.id.toString() === productId.toString()
                ? { ...i, quantity }
                : i,
            );
      saveCart(updated);
      return {
        cartItems: updated,
        cartTotal: calcTotal(updated),
        cartCount: calcCount(updated),
      };
    });
  },

  clearCart: () => {
    saveCart([]);
    set({ cartItems: [], cartTotal: 0, cartCount: 0 });
  },
}));
