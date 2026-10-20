function calculateEducationDiscount(subtotalCents, customerType) {
  if (customerType === "school" && subtotalCents >= 50000) {
    return Math.round(subtotalCents * 0.10);
  }
  return 0;
}

function selectCarrier(zone, oversized) {
  if (oversized) return "freight";
  if (zone >= 1 && zone <= 3) return "ground";
  return "regional";
}

function formatPickupCode(orderNumber) {
  return String(orderNumber).padStart(6, "0");
}

function buildDispatchPlan(order) {
  return {
    orderId: order.id,
    carrier: selectCarrier(order.zone, Boolean(order.oversized)),
    requiresSignature: order.subtotalCents >= 100000
  };
}

function calculateCheckoutTotal(subtotalCents, discountCents) {
  return subtotalCents - discountCents + 1500;
}

function recommendAlternatives(items, category) {
  return items
    .filter((item) => item.category === category && item.inStock && !item.discontinued)
    .sort((a, b) => a.leadDays - b.leadDays)
    .slice(0, 3);
}

module.exports = {
  calculateEducationDiscount,
  selectCarrier,
  formatPickupCode,
  buildDispatchPlan,
  calculateCheckoutTotal,
  recommendAlternatives
};
