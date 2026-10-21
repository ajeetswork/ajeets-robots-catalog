const fs = require("node:fs");
const path = require("node:path");

function currentRegion() {
  return process.env.CATALOG_REGION || "us";
}

function saveLastFilter(cacheDir, filterName) {
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(
    path.join(cacheDir, "last-filter.json"),
    JSON.stringify({ filterName }, null, 2) + "\n",
    "utf8"
  );
}

function readLastFilter(cacheDir) {
  try {
    const value = JSON.parse(
      fs.readFileSync(path.join(cacheDir, "last-filter.json"), "utf8")
    );
    return value.filterName;
  } catch (error) {
    if (error && error.code === "ENOENT") return null;
    throw error;
  }
}

function fixtureSkus(fixturePath) {
  return JSON.parse(fs.readFileSync(fixturePath, "utf8")).map((item) => item.sku);
}

function activeLocale() {
  return globalThis.CATALOG_LOCALE || "en-US";
}

module.exports = {
  currentRegion,
  saveLastFilter,
  readLastFilter,
  fixtureSkus,
  activeLocale,
};
