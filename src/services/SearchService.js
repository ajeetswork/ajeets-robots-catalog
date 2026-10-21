function searchCatalog(items, query) {
  const needle = String(query || '').trim().toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(needle));
}

module.exports = { searchCatalog };
