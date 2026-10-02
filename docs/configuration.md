# Catalog service configuration

Use `.env.example` as the starting point for local development. Runtime configuration is loaded by `src/config/runtime.js`.

| Variable | Purpose | Setup |
| --- | --- | --- |
| `CATALOG_API_BASE_URL` | Base URL used for catalog API requests. | Optional. Defaults to `https://catalog-api.internal.example`. |
| `CATALOG_CACHE_TTL_SECONDS` | Cache lifetime for catalog responses, in seconds. | Optional. Defaults to `300`. |
| `CATALOG_EXPORT_BUCKET` | Storage bucket used for generated catalog export files. | Required. |
| `CATALOG_LOG_LEVEL` | Controls verbosity for webhook processing logs. | Optional. Defaults to `info`. |
| `CATALOG_WEBHOOK_SECRET` | Secret used to validate incoming catalog webhook signatures. | Required. Keep real values out of committed files. |
| `CATALOG_LEGACY_FEED_URL` | Endpoint for the legacy catalog feed used during nightly synchronization. | Optional. |
| `CATALOG_SYNC_BATCH_SIZE` | Batch size for catalog sync operations. | Optional. Defaults to `50`. Must be a positive whole number when set. |

Operational notes:

- Keep real secret material in the deployment environment or local untracked `.env` files.
- Integer settings must use positive whole numbers.
- The service uses its built-in defaults when an optional setting is omitted.
