import { test } from "node:test";
import assert from "node:assert/strict";

function storage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, String(value)), removeItem: (key) => data.delete(key), clear: () => data.clear() };
}
globalThis.localStorage = storage();
globalThis.sessionStorage = storage();
globalThis.window = new EventTarget();
const store = await import("../src/stores/shoppingStore.js");
const session = await import("../src/services/authSession.js");
const product = { id: 9, name: "Test shoe", category_name: "Sport" };
const variant = { id: 10, color_name: "Black", price: 14.99, total_stock: 5, stock_status: "IN_STOCK", images: [] };
const size = { size_id: 1, size: "38", qty: 3, stock_status: "IN_STOCK" };

test("guest cart combines matching variants/sizes and preserves separate choices", () => {
  store.addToCart(product, variant, size, 1);
  store.addToCart(product, variant, size, 1);
  store.addToCart(product, { ...variant, id: 11 }, size, 1);
  store.addToCart(product, variant, { ...size, size_id: 2, size: "39" }, 1);
  assert.equal(store.getSnapshot().cart.length, 3);
  assert.equal(store.getSnapshot().cart[0].quantity, 2);
  assert.throws(() => store.addToCart(product, variant, size, 2), /Only 3 available/);
  assert.throws(() => store.addToCart(product, variant, { ...size, qty: 0 }, 1), /available color and size/);
  assert.throws(() => store.addToCart(product, variant, { ...size, stock_status: "OUT_OF_STOCK" }, 1));
});
test("quantity updates, removal, persistence, and storage failure", async () => {
  const key = store.cartKey(9, 10, 1);
  store.setQuantity(key, 3);
  store.setQuantity(key, 4);
  assert.equal(store.getSnapshot().cart.find((item) => item.key === key).quantity, 3);
  store.removeItem(store.cartKey(9, 11, 1));
  const reloaded = await import("../src/stores/shoppingStore.js?reload");
  assert.deepEqual(reloaded.getSnapshot().cart, store.getSnapshot().cart);
  const before = store.getSnapshot();
  const save = localStorage.setItem;
  localStorage.setItem = () => { throw new Error("Quota"); };
  assert.throws(() => store.removeItem(key), /Unable to save/);
  assert.equal(store.getSnapshot(), before);
  localStorage.setItem = save;
});
test("favorites toggle by product ID and survive reload", async () => {
  store.toggleFavorite(product);
  assert.equal(store.getSnapshot().favorites.length, 1);
  const reloaded = await import("../src/stores/shoppingStore.js?favorites");
  assert.equal(reloaded.getSnapshot().favorites[0].id, 9);
  store.toggleFavorite({ ...product, id: "9" });
  assert.equal(store.getSnapshot().favorites.length, 0);
});
test("corrupt persisted data does not break shopping", async () => {
  localStorage.setItem("go-shoes-shopping-v1", "broken json");
  const clean = await import("../src/stores/shoppingStore.js?corrupt");
  assert.deepEqual(clean.getSnapshot(), { cart: [], favorites: [] });
});
test("sessions respect remember-me, expiration, and logout without clearing cart", () => {
  const jwt = (exp) => `header.${btoa(JSON.stringify({ exp }))}.signature`;
  const token = jwt(Math.floor(Date.now() / 1000) + 3600);
  localStorage.setItem("go-shoes-shopping-v1", "preserved");
  session.saveSession(token, { name: "Test" }, true);
  assert.equal(session.readSession().token, token);
  assert.equal(localStorage.getItem("token"), token);
  session.saveSession(token, { name: "Test" }, false);
  assert.equal(localStorage.getItem("token"), null);
  assert.equal(sessionStorage.getItem("token"), token);
  session.saveSession(jwt(1), {}, true);
  assert.equal(session.readSession(), null);
  session.clearSession();
  assert.equal(session.readSession(), null);
  assert.equal(localStorage.getItem("go-shoes-shopping-v1"), "preserved");
});
test("return paths keep checkout and reject external redirects", () => {
  assert.equal(session.safeReturnPath("/checkout"), "/checkout");
  for (const path of ["https://example.com", "//example.com", "/\\example.com", "/login", "/register"]) {
    assert.equal(session.safeReturnPath(path), "/account");
  }
});
