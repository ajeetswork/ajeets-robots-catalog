const _ = require("lodash");
const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");

function normalizeProduct(product) {
  return {
    id: product.id || uuidv4(),
    title: _.startCase(_.trim(product.title || "")),
    sku: _.toUpper(_.trim(product.sku || "")),
    updatedAt: dayjs(product.updatedAt || new Date()).toISOString(),
    tags: _.uniq((product.tags || []).map((tag) => _.kebabCase(tag)))
  };
}

function normalizeCatalog(products) {
  return products.map(normalizeProduct);
}

module.exports = {
  normalizeCatalog,
  normalizeProduct
};
