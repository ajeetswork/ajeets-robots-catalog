const test = require("node:test");
const assert = require("node:assert/strict");

// Contract source: Ajeet's Robots Public API Error Response Contract (doc 1eHJ8R9Jh8TU9Uer1W7vFnnMKQWotyUJRkx8hU0xKskU)
// Asserts ONLY externally documented fields — status, error code, approved public fields/messages.
// Never asserts internal exception messages, workspace/role, provider details, or stack traces.

function assertPublicShape(status, body, expectedStatus, expectedError, allowedFields, expectedMessage) {
  assert.equal(status, expectedStatus, `expected status ${expectedStatus} got ${status}`);
  assert.equal(body.error, expectedError);
  assert.equal(body.message, expectedMessage);
  const extra = Object.keys(body).filter((k) => !allowedFields.includes(k));
  assert.equal(extra.length, 0, `unexpected fields ${extra.join(",")} — only ${allowedFields.join(",")} allowed`);
}

// Shared loader for ESM modules (package is commonjs, src/api is ESM)
let PublicErrorMapper, PublicErrors, CatalogPublicRoutes;
async function load() {
  if (PublicErrorMapper) return;
  PublicErrorMapper = await import("../src/api/PublicErrorMapper.js");
  PublicErrors = await import("../src/api/PublicErrors.js");
  CatalogPublicRoutes = await import("../src/api/CatalogPublicRoutes.js");
}

// --- High-confidence mismatch #1: Operation denied must not expose internal diagnostics (contract §4) ---
test("PATCH catalog item denied — returns 403 operation_denied with sanitized message and only approved fields", async () => {
  await load();
  // unauthorized role triggers OperationDenied internally (workspace/role details must not leak)
  const [status, body] = CatalogPublicRoutes.patchCatalogItem("item-1", { expected_revision: 12 }, "viewer");
  assertPublicShape(status, body, 403, "operation_denied", ["error", "message"], "You do not have permission to perform this operation");
  assert.ok(!String(body.message).includes("role="), "message must not leak role diagnostics");
  assert.ok(!String(body.message).includes("workspace"), "message must not leak workspace");
});

// --- High-confidence mismatch #2: Concurrent update conflict is a documented 409 (contract §5), not 500 ---
test("PATCH catalog item with stale revision — returns 409 conflict with approved fields", async () => {
  await load();
  const [status, body] = CatalogPublicRoutes.patchCatalogItem("item-1", { expected_revision: 999 }, "catalog_editor");
  assertPublicShape(status, body, 409, "conflict", ["error", "message"], "The resource changed before this request could be applied");
  // ensure body does not copy internal revision string
  assert.ok(!String(body.message).includes("999"), "message must be generic, not internal revision");
});

// Negative guard: nearby 409 for invalid_state must stay distinct from conflict (both 409, different error codes)
test("PATCH invalid state (retired+featured) stays 409 invalid_state — not collapsed into conflict", async () => {
  await load();
  const [status, body] = CatalogPublicRoutes.patchCatalogItem("item-1", { expected_revision: 12, state: "retired", featured: true }, "catalog_editor");
  assertPublicShape(status, body, 409, "invalid_state", ["error", "message"], "Operation is not valid in the current state");
  assert.notEqual(body.error, "conflict", "invalid_state and conflict must remain distinct even though both are 409");
});

// --- High-confidence mismatch #3: Dependency unavailable is a documented 503 (contract §7), not 500 ---
test("POST catalog item with unavailable media dependency — returns 503 dependency_unavailable sanitized", async () => {
  await load();
  const [status, body] = CatalogPublicRoutes.postCatalogItem({ name: "Rover", sku: "AR-ROVER-X", image_source: "media-service-offline" });
  assertPublicShape(status, body, 503, "dependency_unavailable", ["error", "message"], "A required service is temporarily unavailable");
  assert.ok(!String(body.message).includes("media service"), "message must not leak provider/connection details");
});

test("POST preview for renderer-down — also returns 503 dependency_unavailable (second dependency trigger)", async () => {
  await load();
  const [status, body] = CatalogPublicRoutes.postCatalogPreview("renderer-down", 1);
  assertPublicShape(status, body, 503, "dependency_unavailable", ["error", "message"], "A required service is temporarily unavailable");
});

// Additional negative: unknown/unexpected error must still be generic 500 internal_error — not collapsed into 503/409
test("generic unknown error remains 500 internal_error — distinct from documented failures", async () => {
  await load();
  const [status, body] = PublicErrorMapper.toPublicError(new Error("something totally unexpected"));
  assertPublicShape(status, body, 500, "internal_error", ["error", "message"], "An unexpected error occurred");
  assert.notEqual(status, 503, "unexpected failure must not be mapped to dependency_unavailable");
  assert.notEqual(status, 409, "unexpected failure must not be mapped to conflict/invalid_state");
});
