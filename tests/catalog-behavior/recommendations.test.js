const test = require("node:test");
const assert = require("node:assert/strict");
const { recommendAlternatives } = require("../../src/fulfillment/checkout-rules");

test("unavailable item can receive suitable alternatives", () => {
  const items = [
    { id: "R-1", category: "classroom", inStock: true, discontinued: false, leadDays: 4 },
    { id: "R-2", category: "classroom", inStock: true, discontinued: false, leadDays: 2 },
    { id: "R-3", category: "classroom", inStock: false, discontinued: false, leadDays: 1 },
    { id: "R-4", category: "classroom", inStock: true, discontinued: false, leadDays: 2 }
  ];

  const results = recommendAlternatives(items, "classroom");
  assert.ok(results.length <= 3);
  assert.ok(results.every((item) => item.inStock && !item.discontinued));
});
