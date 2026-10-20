const test = require("node:test");
const assert = require("node:assert/strict");
const { buildDispatchPlan } = require("../../src/fulfillment/checkout-rules");

test("dispatch plan can be produced for a normal order", () => {
  const plan = buildDispatchPlan({ id: "AR-1042", zone: 2, oversized: false, subtotalCents: 42000 });
  assert.ok(plan);
  assert.equal(plan.orderId, "AR-1042");
});
