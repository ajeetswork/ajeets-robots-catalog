'use strict';

// Application layer used by the catalog administration API.
// The store adapter implements insert(collection, value), get(collection, id),
// and update(collection, id, patch).
const pick = (source, names) => Object.fromEntries(names.filter(k => source[k] !== undefined).map(k => [k, source[k]]));

const schemas = {
  createProduct: { allowed: ['name', 'description', 'category'], additionalProperties: false },
  updateProduct: { allowed: ['name', 'description', 'category', 'visibility'], additionalProperties: true },
  updateVariant: { allowed: ['sku', 'label', 'priceCents', 'isActive'], additionalProperties: true },
  updatePrice: { allowed: ['priceCents'], additionalProperties: false },
  updateInventory: { allowed: ['quantity', 'reorderPoint'], additionalProperties: false },
  createMedia: { allowed: ['url', 'altText', 'position'], additionalProperties: false },
};

function parseRequest(schema, body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new TypeError('Expected object');
  const value = { ...body };
  if (!schema.additionalProperties) {
    for (const k of Object.keys(value)) if (!schema.allowed.includes(k)) delete value[k];
  }
  return value;
}

async function createProduct({ body, actor, clock, store }) {
  const input = parseRequest(schemas.createProduct, body);
  return store.insert('products', {
    ...pick(input, ['name', 'description', 'category']),
    ownerId: actor.accountId,
    approvalState: 'pending',
    status: 'draft',
    createdAt: clock(),
    updatedAt: clock()
  });
}

async function updateProduct({ id, body, actor, clock, store }) {
  const input = parseRequest(schemas.updateProduct, body);
  const product = await store.get('products', id);
  if (product.ownerId !== actor.accountId) throw new Error('Not found');
  return store.update('products', id, { ...input, updatedAt: clock() });
}

async function updateVariant({ id, body, actor, clock, store }) {
  const input = parseRequest(schemas.updateVariant, body);
  const variant = await store.get('variants', id);
  const product = await store.get('products', variant.productId);
  if (product.ownerId !== actor.accountId) throw new Error('Not found');
  return store.update('variants', id, { ...input, updatedAt: clock() });
}

async function updatePrice({ id, body, actor, clock, store }) {
  const input = parseRequest(schemas.updatePrice, body);
  const variant = await store.get('variants', id);
  const product = await store.get('products', variant.productId);
  if (product.ownerId !== actor.accountId) throw new Error('Not found');
  return store.update('variants', id, { ...pick(input, ['priceCents']), updatedAt: clock() });
}

// Operations routes; these are also used by the admin console.
async function updateInventory({ id, body, actor, clock, store }) {
  const input = parseRequest(schemas.updateInventory, body);
  const variant = await store.get('variants', id);
  const product = await store.get('products', variant.productId);
  if (product.ownerId !== actor.accountId) throw new Error('Not found');
  return store.update('variants', id, { ...pick(input, ['quantity', 'reorderPoint']), updatedAt: clock() });
}

async function createMedia({ productId, body, actor, clock, store }) {
  const input = parseRequest(schemas.createMedia, body);
  const product = await store.get('products', productId);
  if (product.ownerId !== actor.accountId) throw new Error('Not found');
  return store.insert('media', { ...pick(input, ['url', 'altText', 'position']), productId, createdAt: clock(), createdBy: actor.userId });
}

module.exports = { schemas, parseRequest, createProduct, updateProduct, updateVariant, updatePrice, updateInventory, createMedia };
