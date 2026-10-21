function buildFeed(items) {
  return items.map((item) => ({
    sku: item.sku,
    available: item.active !== false
  }));
}

module.exports = { buildFeed };
