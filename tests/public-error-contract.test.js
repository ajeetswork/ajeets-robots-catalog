const test = require("node:test");
const assert = require("node:assert/strict");
function assertPublicShape(status, body, expectedStatus, expectedError, allowedFields, expectedMessage) {
  assert.equal(status, expectedStatus, `expected status ${expectedStatus} got ${status} body=${JSON.stringify(body)}`);
  assert.equal(body.error, expectedError);
  assert.equal(body.message, expectedMessage);
  const extra = Object.keys(body).filter((k) => !allowedFields.includes(k));
  assert.equal(extra.length, 0, `unexpected fields ${extra.join(",")} — only ${allowedFields.join(",")} allowed`);
}
let PublicErrorMapper, CatalogPublicRoutes;
async function load(){
  if(PublicErrorMapper) return;
  PublicErrorMapper = await import("../src/api/PublicErrorMapper.js");
  CatalogPublicRoutes = await import("../src/api/CatalogPublicRoutes.js");
}
test("PATCH catalog item denied — returns 403 operation_denied with sanitized message and only approved fields", async () => {
  await load();
  const [status, body] = CatalogPublicRoutes.patchCatalogItem("item-1", { expected_revision: 12 }, "viewer");
  assertPublicShape(status, body, 403, "operation_denied", ["error", "message"], "You do not have permission to perform this operation");
  assert.ok(!String(body.message).includes("role="));
  assert.ok(!String(body.message).includes("workspace"));
});
test("PATCH catalog item with stale revision — returns 409 conflict with approved fields", async () => {
  await load();
  const [status, body] = CatalogPublicRoutes.patchCatalogItem("item-1", { expected_revision: 999 }, "catalog_editor");
  assertPublicShape(status, body, 409, "conflict", ["error", "message"], "The resource changed before this request could be applied");
  assert.ok(!String(body.message).includes("999"));
});
test("PATCH invalid state (retired+featured) stays 409 invalid_state — not collapsed into conflict", async () => {
  await load();
  const [status, body] = CatalogPublicRoutes.patchCatalogItem("item-1", { expected_revision: 12, state: "retired", featured: true }, "catalog_editor");
  assertPublicShape(status, body, 409, "invalid_state", ["error", "message"], "Operation is not valid in the current state");
  assert.notEqual(body.error, "conflict");
});
test("POST catalog item with unavailable media dependency — returns 503 dependency_unavailable sanitized", async () => {
  await load();
  const [status, body] = CatalogPublicRoutes.postCatalogItem({ name: "Rover", sku: "AR-ROVER-X", image_source: "media-service-offline" });
  assertPublicShape(status, body, 503, "dependency_unavailable", ["error", "message"], "A required service is temporarily unavailable");
  assert.ok(!String(body.message).includes("media service"));
});
test("POST preview for renderer-down — also returns 503 dependency_unavailable (second dependency trigger)", async () => {
  await load();
  const [status, body] = CatalogPublicRoutes.postCatalogPreview("renderer-down", 1);
  assertPublicShape(status, body, 503, "dependency_unavailable", ["error", "message"], "A required service is temporarily unavailable");
});
test("generic unknown error remains 500 internal_error — distinct from documented failures", async () => {
  await load();
  const [status, body] = PublicErrorMapper.toPublicError(new Error("something totally unexpected"));
  assertPublicShape(status, body, 500, "internal_error", ["error", "message"], "An unexpected error occurred");
  assert.notEqual(status, 503);
  assert.notEqual(status, 409);
});
