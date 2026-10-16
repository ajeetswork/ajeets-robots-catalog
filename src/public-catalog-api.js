/**
 * Public catalog helper API used by storefront and partner integrations.
 */

/**
 * Return a compact product record for a catalog item.
 * Contract: returns null when the requested product cannot be found.
 */
export function getProduct(productId, options = {}) {
  const includeInventory = options.includeInventory === true;
  const product = findProductById(productId);
  if (!product) return null;

  const result = {
    id: product.id,
    title: product.title,
    priceCents: product.priceCents,
  };

  if (includeInventory) {
    result.inventory = product.inventory;
  }

  return result;
}

/**
 * Format an integer cent amount for display.
 * Contract: currency is optional and defaults to USD.
 */
export function formatPrice({ amountCents, currency }) {
  if (!Number.isInteger(amountCents)) {
    throw new TypeError("amountCents must be an integer");
  }
  if (typeof currency !== "string") {
    throw new TypeError("currency must be supplied");
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountCents / 100);
}

/**
 * Normalize a catalog title for display/search comparison.
 * Contract: trim surrounding whitespace and collapse internal whitespace
 * without changing letter case.
 */
export function normalizeCatalogTitle(title) {
  if (typeof title !== "string") {
    throw new TypeError("title must be a string");
  }

  return title.trim().replace(/\s+/g, " ");
}

function findProductById(productId) {
  const products = [
    { id: "AR-100", title: "Desk Rover", priceCents: 12999, inventory: 18 },
    { id: "AR-220", title: "Workshop Arm", priceCents: 24999, inventory: 7 },
  ];

  return products.find((item) => item.id === productId) || null;
}
