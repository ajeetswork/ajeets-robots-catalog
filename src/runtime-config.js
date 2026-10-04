const dotenv = require("dotenv");

dotenv.config();

function getCatalogRuntimeConfig() {
  return {
    catalogPath: process.env.CATALOG_PATH || "catalog.json",
    outputPath: process.env.CATALOG_OUTPUT_PATH || "dist/catalog-feed.json",
    environment: process.env.NODE_ENV || "development"
  };
}

module.exports = {
  getCatalogRuntimeConfig
};
