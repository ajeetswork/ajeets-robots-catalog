# ajeets-robots-catalog

Product catalog for Ajeets Robots Printify store.

## Local configuration

The catalog service reads runtime settings from environment variables. Copy `.env.example` for local development and see `docs/configuration.md` for the supported settings and operational notes.

## Database migrations

Database migrations are stored in `db/migrations` and use `-- migrate:up` / `-- migrate:down` sections when a down path is defined.
