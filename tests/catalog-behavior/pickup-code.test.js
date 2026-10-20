const test = require("node:test");
const assert = require("node:assert/strict");
const { formatPickupCode } = require("../../src/fulfillment/checkout-rules");

test("pickup code has the warehouse scanner width", () => {
  const code = formatPickupCode(42);
  assert.equal(code.length, 6);
});
