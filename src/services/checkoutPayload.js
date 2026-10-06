export function calculateCheckoutTotal(items, deliveryFee) {
  const cents = (value) => {
    if (value == null || value === "" || !Number.isFinite(Number(value)) || Number(value) < 0) {
      throw new Error("Product price or delivery fee is unavailable. Please refresh and try again.");
    }
    return Math.round((Number(value) + Number.EPSILON) * 100);
  };
  const amount = items.reduce((sum, item) => {
    if (!Number.isInteger(item.quantity) || item.quantity < 1) throw new Error("Invalid item quantity.");
    return sum + cents(item.price) * item.quantity;
  }, cents(deliveryFee));
  return amount / 100;
}

export function buildCheckoutPayload(fields, deliveryId, paymentMethod, items, deliveryFee) {
  const required = ["recipient_name", "recipient_phone", "delivery_address"];
  const details = Object.fromEntries(required.map((key) => [key, String(fields[key] ?? "").trim()]));
  if (required.some((key) => !details[key])) throw new Error("Please enter your name, phone number, and delivery address.");
  if (!Number.isInteger(Number(deliveryId)) || Number(deliveryId) <= 0) throw new Error("Please choose a delivery method.");
  if (!paymentMethod) throw new Error("Please choose a payment method.");
  if (!items.length) throw new Error("Your cart is empty.");
  const quantities = new Map();
  for (const item of items) {
    const id = Number(item.variantStockId);
    if (!Number.isInteger(id) || id <= 0) throw new Error(`Stock information is unavailable for ${item.name}. Please refresh the product or contact the store.`);
    if (!Number.isInteger(item.quantity) || item.quantity < 1) throw new Error("Invalid item quantity.");
    quantities.set(id, (quantities.get(id) ?? 0) + item.quantity);
  }
  return { delivery_method_id: Number(deliveryId), ...details, note: String(fields.note ?? "").trim(),
    payment_method: paymentMethod,
    expected_total_amount: calculateCheckoutTotal(items, deliveryFee),
    items: [...quantities].map(([variant_stock_id, quantity]) => ({ variant_stock_id, quantity })) };
}

export function paymentOptions(options) {
  const result = (options ?? []).flatMap((option) => {
    const explicit = option.code ?? option.value ?? option.payment_method;
    const name = String(option.label ?? option.name ?? "");
    const code = explicit || (/^(COD|cash on delivery|cash_on_delivery)$/i.test(name) ? "COD" : "");
    return code ? [{ value: code, title: name || code, description: code === "COD" ? "Pay when your order arrives." : "" }] : [];
  });
  // COD is explicitly documented in the checkout request contract.
  return result.length ? result : [{ value: "COD", title: "Cash on Delivery", description: "Pay when your order arrives." }];
}
