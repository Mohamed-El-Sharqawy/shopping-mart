import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CartItemsProps = {
  items: CartItem[];
  removeFromCart: (id: number) => void;
  handleQuantityChange: (id: number, quantity: number) => void;
};

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}
