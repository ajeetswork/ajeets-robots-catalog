const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateEducationDiscount, calculateCheckoutTotal } = require("../../src/fulfillment/checkout-rules");

test("education checkout produces a payable total", () => {
  const discount = calculateEducationDiscount(50000, "school");
  const total = calculateCheckoutTotal(50000, discount);
  assert.ok(total > 0);
  assert.equal(typeof total, "number");
});
