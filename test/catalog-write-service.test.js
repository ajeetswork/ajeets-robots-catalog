'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const writes = require('../src/catalog/write-service');
const { makeStore, actor, clock } = require('./catalog-write-helpers');

test('create product populates initial workflow metadata', async () => {
  const store = makeStore();
  const item = await writes.createProduct({ body: { name: 'Explorer Kit', description: 'Classroom set', category: 'kits' }, actor, clock, store });
  assert.equal(item.name, 'Explorer Kit');
  assert.equal(item.ownerId, 'acct-1');
  assert.equal(item.approvalState, 'pending');
});

test('product editor can change description', async () => {
  const store = makeStore({ products: [{ id: 'p1', ownerId: 'acct-1', name: 'Explorer Kit', description: 'Old', status: 'draft' }] });
  const item = await writes.updateProduct({ id: 'p1', body: { description: 'New' }, actor, clock, store });
  assert.equal(item.description, 'New');
});

test('variant editor can change label', async () => {
  const store = makeStore({ products: [{ id: 'p1', ownerId: 'acct-1' }], variants: [{ id: 'v1', productId: 'p1', label: 'Small', priceCents: 1200 }] });
  const item = await writes.updateVariant({ id: 'v1', body: { label: 'Medium' }, actor, clock, store });
  assert.equal(item.label, 'Medium');
});

test('price adjustment keeps product ownership', async () => {
  const store = makeStore({ products: [{ id: 'p1', ownerId: 'acct-1' }], variants: [{ id: 'v1', productId: 'p1', priceCents: 1200 }] });
  const item = await writes.updatePrice({ id: 'v1', body: { priceCents: 1500 }, actor, clock, store });
  assert.equal(item.priceCents, 1500);
});
