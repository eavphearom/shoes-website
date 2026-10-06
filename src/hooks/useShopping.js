import { useSyncExternalStore } from "react";
import { subscribe, getSnapshot, addToCart, setQuantity, removeItem, toggleFavorite } from "../stores/shoppingStore";

export default function useShopping() {
  const state = useSyncExternalStore(subscribe, getSnapshot);
  return { ...state, addToCart, setQuantity, removeItem, toggleFavorite,
    cartCount: state.cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) };
}
