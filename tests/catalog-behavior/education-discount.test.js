const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateEducationDiscount } = require("../../src/fulfillment/checkout-rules");

test("school order at the threshold receives the education discount", () => {
  assert.equal(calculateEducationDiscount(50000, "school"), 5000);
  assert.equal(calculateEducationDiscount(49999, "school"), 0);
  assert.equal(calculateEducationDiscount(50000, "retail"), 0);
});
