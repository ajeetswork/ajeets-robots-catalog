const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  currentRegion,
  saveLastFilter,
  readLastFilter,
  fixtureSkus,
  activeLocale,
} = require("../../src/runtime/catalog-session");
const {
  withGlobalProperty,
} = require("../support/runtime-fixtures");

const sharedCacheDir = path.join(
  process.cwd(),
  ".catalog-cache",
  "runtime-catalog-view"
);
const skuFixture = path.join(
  process.cwd(),
  "fixtures",
  "runtime",
  "catalog-skus.json"
);

test("uses the EU catalog region when configured", () => {
  process.env.CATALOG_REGION = "eu";
  assert.equal(currentRegion(), "eu");
});

test("uses the US catalog region when no override is configured", () => {
  assert.equal(currentRegion(), "us");
});

test("remembers the most recent filter for the next catalog view", () => {
  fs.rmSync(sharedCacheDir, { recursive: true, force: true });
  saveLastFilter(sharedCacheDir, "warehouse");
  assert.equal(readLastFilter(sharedCacheDir), "warehouse");
});

test("a new catalog view starts without a remembered filter", () => {
  assert.equal(readLastFilter(sharedCacheDir), null);
});

test("release SKU fixture remains unchanged while being read", () => {
  const before = fs.readFileSync(skuFixture, "utf8");
  assert.deepEqual(fixtureSkus(skuFixture), [
    "AR-ROVER-2",
    "AR-SCOUT-MINI",
    "AR-LIFT-KIT",
  ]);
  assert.equal(fs.readFileSync(skuFixture, "utf8"), before);
});

test("preview locale is temporary", async () => {
  await withGlobalProperty("CATALOG_LOCALE", "fr-CA", async () => {
    assert.equal(activeLocale(), "fr-CA");
  });
  assert.equal(activeLocale(), "en-US");
});
