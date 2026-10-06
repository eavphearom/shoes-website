const KEY = "go-shoes-shopping-v1";
const listeners = new Set();
function read() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY));
    return {
      cart: Array.isArray(value?.cart) ? value.cart.filter((item) => item && item.productId != null
        && item.variantId != null && item.sizeId != null && Number.isFinite(item.price) && item.price >= 0
        && Number.isInteger(item.quantity) && item.quantity > 0 && Number.isInteger(item.stock)
        && item.stock >= item.quantity && Array.isArray(item.details) && typeof item.name === "string"
        && item.key === `${item.productId}:${item.variantId}:${item.sizeId}`) : [],
      favorites: Array.isArray(value?.favorites) ? value.favorites.filter((item) => item && item.id != null && typeof item.name === "string") : [],
    };
  } catch { return { cart: [], favorites: [] }; }
}
let state = read();
function commit(next) {
  // Keep the visible state unchanged if persistence fails.
  try { localStorage.setItem(KEY, JSON.stringify(next)); }
  catch { throw new Error("Unable to save your shopping items. Please allow browser storage and try again."); }
  state = next;
  listeners.forEach((listener) => listener());
}
export const subscribe = (listener) => { listeners.add(listener); return () => listeners.delete(listener); };
export const getSnapshot = () => state;
export const cartKey = (productId, variantId, sizeId) => `${productId}:${variantId}:${sizeId}`;
export function addToCart(product, variant, size, quantity) {
  const stock = Math.min(Number(variant?.total_stock), Number(size?.qty));
  const unavailable = [variant?.stock_status, size?.stock_status].some((status) =>
    String(status).toUpperCase().replaceAll(" ", "_") === "OUT_OF_STOCK");
  if (!product?.id || !variant?.id || !size?.size_id || unavailable || !Number.isInteger(stock) || stock < 1
    || !Number.isInteger(quantity) || quantity < 1 || !Number.isFinite(Number(variant.price)) || Number(variant.price) < 0) {
    throw new Error("Please select an available color and size.");
  }
  const key = cartKey(product.id, variant.id, size.size_id);
  const existing = state.cart.find((item) => item.key === key);
  const nextQuantity = (existing?.quantity ?? 0) + quantity;
  if (nextQuantity > stock) throw new Error(`Only ${stock} available for this size; ${existing?.quantity ?? 0} already in your cart.`);
  const item = {
    key, productId: product.id, variantId: variant.id, sizeId: size.size_id,
    variantStockId: size.variant_stock_id
      ?? variant.stock?.find((entry) => String(entry.size_id) === String(size.size_id))?.id ?? null,
    name: product.name, category: product.category_name, color: variant.color_name, size: size.size,
    details: [`Size: ${size.size}`, `Color: ${variant.color_name}`],
    image: (variant.images?.find((image) => image.is_primary) ?? variant.images?.[0])?.image ?? "",
    price: Number(variant.price), quantity: nextQuantity, stock,
  };
  commit({ ...state, cart: existing ? state.cart.map((entry) => entry.key === key ? item : entry) : [...state.cart, item] });
}
export function setQuantity(key, quantity) {
  const item = state.cart.find((entry) => entry.key === key);
  if (!item || !Number.isInteger(quantity) || quantity < 1 || quantity > item.stock) return;
  commit({ ...state, cart: state.cart.map((entry) => entry.key === key ? { ...entry, quantity } : entry) });
}
export function removeItem(key) { commit({ ...state, cart: state.cart.filter((item) => item.key !== key) }); }
export function removeOrderedItems(ordered) {
  const quantities = new Map(ordered.map((item) => [item.key, item.quantity]));
  commit({ ...state, cart: state.cart.flatMap((item) => {
    const quantity = item.quantity - (quantities.get(item.key) ?? 0);
    return quantity > 0 ? [{ ...item, quantity }] : [];
  }) });
}
export function toggleFavorite(product) {
  if (product.id == null) return;
  const exists = state.favorites.some((item) => String(item.id) === String(product.id));
  commit({ ...state, favorites: exists
    ? state.favorites.filter((item) => String(item.id) !== String(product.id))
    : [...state.favorites, { id: product.id, name: product.name, image: product.image,
      slug: product.slug, price: product.price, stockStatus: product.stockStatus }] });
}
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === KEY || event.key === null) {
      state = read(); listeners.forEach((listener) => listener());
    }
  });
}
