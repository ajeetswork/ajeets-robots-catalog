# Catalog development

The checked-in `catalog.json` file is the source of truth for product data.

Run `node scripts/build-catalog.mjs` after catalog edits. The script derives `dist/catalog-index.json` for downstream packaging and writes `reports/catalog-validation.json` as a validation result.

Run `node scripts/catalog-preview.mjs` during local preview work. It stores editor/session state in `.catalog-cache/state.json`; that state is not required by CI or releases and can vary per workstation.

`fixtures/catalog-sample.json` is a small hand-maintained example used by documentation and smoke tests. Keep it in source control.

Commit `package-lock.json` with dependency updates so installs remain reproducible. Keep `.env.example` as the documented variable template, but do not commit developer `.env` or `.env.local` files.
