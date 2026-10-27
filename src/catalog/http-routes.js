'use strict';
const service = require('./write-service');

// The router supplies validated auth context and the catalog store adapter.
// send() writes the HTTP response, while mapError() handles thrown domain errors.
function registerCatalogWrites(router, deps) {
  const routes = [
    ['post', '/catalog/products', 'createProduct'],
    ['patch', '/catalog/products/:id', 'updateProduct'],
    ['patch', '/catalog/variants/:id', 'updateVariant'],
    ['patch', '/catalog/variants/:id/price', 'updatePrice'],
    ['patch', '/catalog/variants/:id/inventory', 'updateInventory'],
    ['post', '/catalog/products/:productId/media', 'createMedia']
  ];
  for (const [method, path, action] of routes) {
    router[method](path, async (req, res, next) => {
      try {
        const value = await service[action]({
          ...req.params, body: req.body, actor: req.auth, clock: deps.clock, store: deps.store
        });
        res.status(method === 'post' ? 201 : 200).json(value);
      } catch (error) { next(error); }
    });
  }
}
module.exports = { registerCatalogWrites };
