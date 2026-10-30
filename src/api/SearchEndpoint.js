const { searchCatalog } = require('../services/SearchService.js');

function handleSearch(items, query) {
  return searchCatalog(items, query);
}

module.exports = { handleSearch };
