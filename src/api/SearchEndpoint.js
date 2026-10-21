const { searchCatalog } = require('../services/searchservice.js');

function handleSearch(items, query) {
  return searchCatalog(items, query);
}

module.exports = { handleSearch };
