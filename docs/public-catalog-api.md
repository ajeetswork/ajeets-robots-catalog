# Public Catalog Helper API

The helpers in `src/public-catalog-api.js` are supported caller-facing interfaces for storefront code, internal web clients, and partner integration scripts.

## getProduct(productId, options?)

Returns a compact product object for a catalog item.

- `productId` is a catalog string ID.
- `options` is optional.
- `options.includeInventory` may be set to `true` to include the `inventory` field.
- If no matching product exists, the function returns `null`. Callers may use a null check to handle a missing item.

Example:

```js
const product = getProduct("AR-100");
if (product === null) {
  renderNotFound();
} else {
  renderProduct(product);
}
```

## formatPrice(cents, currency?)

Formats an integer cent amount for display.

- `cents` is required and must be an integer.
- `currency` is optional and defaults to `"USD"`.
- Existing callers may pass only the amount when USD formatting is desired.

Example:

```js
const label = formatPrice(12999);
const cadLabel = formatPrice(12999, "CAD");
```

## normalizeCatalogTitle(title)

Normalizes a catalog title by trimming leading/trailing whitespace and collapsing repeated internal whitespace to a single space.

- Letter case is preserved.
- The return value is always a string for valid string input.

Example:

```js
normalizeCatalogTitle("  Workshop   Arm "); // "Workshop Arm"
```
