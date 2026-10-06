import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCheckoutPayload, calculateCheckoutTotal, paymentOptions } from "../src/services/checkoutPayload.js";

const fields = { recipient_name: " Sok Dara ", recipient_phone: "012345678", delivery_address: "Street 271", note: "Call first" };
test("checkout payload uses stock IDs and quantities, not variant or size IDs", () => {
  const payload = buildCheckoutPayload(fields, 1, "COD", [
    { variantStockId: 5, variantId: 90, sizeId: 12, quantity: 2, price: 20 },
    { variantStockId: 6, quantity: 1, price: 12.5 },
  ], 2);
  assert.deepEqual(payload, { delivery_method_id: 1, recipient_name: "Sok Dara", recipient_phone: "012345678",
    delivery_address: "Street 271", note: "Call first", payment_method: "COD", expected_total_amount: 54.5,
    items: [{ variant_stock_id: 5, quantity: 2 }, { variant_stock_id: 6, quantity: 1 }] });
});
test("totals include the selected fee with cent-based arithmetic", () => {
  assert.equal(calculateCheckoutTotal([{ price: 26.25, quantity: 2 }], 2), 54.5);
  assert.equal(calculateCheckoutTotal([{ price: 0.1, quantity: 3 }], 0.2), 0.5);
  assert.equal(calculateCheckoutTotal([{ price: "14.99", quantity: 2 }], "2"), 31.98);
  assert.equal(calculateCheckoutTotal([{ price: 10, quantity: 1 }], 0), 10);
  assert.throws(() => calculateCheckoutTotal([{ price: 10, quantity: 1 }], null), /fee is unavailable/);
  assert.throws(() => calculateCheckoutTotal([{ price: 10, quantity: 1 }], -1), /fee is unavailable/);
});
test("missing stock IDs and invalid form data block submission", () => {
  assert.throws(() => buildCheckoutPayload(fields, 1, "COD", [{ name: "Shoe", variantId: 5, sizeId: 6, quantity: 1 }]), /Stock information/);
  assert.throws(() => buildCheckoutPayload({ ...fields, recipient_name: " " }, 1, "COD", []), /enter your name/);
  assert.throws(() => buildCheckoutPayload(fields, 1, "COD", []), /empty/);
  assert.throws(() => buildCheckoutPayload(fields, 1, "COD", [{ variantStockId: 5, quantity: 0 }]), /quantity/);
});
test("payment options never turn brand IDs into payment codes", () => {
  assert.equal(paymentOptions([{ name: "Nike", id: 1 }])[0].value, "COD");
  assert.equal(paymentOptions([{ name: "Cash on Delivery", code: "COD" }])[0].value, "COD");
});
test("order form payment values preserve the API labels", () => {
  const options = paymentOptions([{ value: "COD", label: "Cash on Delivery" }, { value: "ONLINE", label: "Online Payment" }]);
  assert.deepEqual(options.map(({ value, title }) => ({ value, title })), [
    { value: "COD", title: "Cash on Delivery" }, { value: "ONLINE", title: "Online Payment" },
  ]);
});
