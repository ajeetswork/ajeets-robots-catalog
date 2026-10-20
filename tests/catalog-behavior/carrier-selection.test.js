const test = require("node:test");
const assert = require("node:assert/strict");
const { selectCarrier } = require("../../src/fulfillment/checkout-rules");

test("standard order in a local delivery zone gets a carrier", () => {
  const carrier = selectCarrier(3, false);
  assert.ok(carrier);
});
