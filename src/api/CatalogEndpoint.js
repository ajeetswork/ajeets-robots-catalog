const { formatPrice } = require('#shared/formatters/price.js');

function serializeCatalogItem(item) {
  return {
    sku: item.sku,
    displayPrice: formatPrice(item.priceCents)
  };
}

module.exports = { serializeCatalogItem };
