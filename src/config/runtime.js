const DEFAULT_API_BASE_URL = "https://catalog-api.internal.example";
const DEFAULT_CACHE_TTL_SECONDS = 300;
const DEFAULT_LOG_LEVEL = "info";
const DEFAULT_SYNC_BATCH_SIZE = 50;

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function positiveInteger(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return value;
}

function loadCatalogConfig() {
  return {
    apiBaseUrl: process.env.CATALOG_API_BASE_URL || DEFAULT_API_BASE_URL,
    cacheTtlSeconds: positiveInteger("CATALOG_CACHE_TTL_SECONDS", DEFAULT_CACHE_TTL_SECONDS),
    exportBucket: requiredEnv("CATALOG_EXPORT_BUCKET"),
    logLevel: process.env.CATALOG_LOG_LEVEL || DEFAULT_LOG_LEVEL,
    syncBatchSize: positiveInteger("CATALOG_SYNC_BATCH_SIZE", DEFAULT_SYNC_BATCH_SIZE),
    webhookSecret: requiredEnv("CATALOG_WEBHOOK_SECRET"),
  };
}

module.exports = { loadCatalogConfig };
