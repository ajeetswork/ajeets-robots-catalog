-- migrate:up
CREATE TABLE fulfillment_batches (
  id BIGSERIAL PRIMARY KEY,
  warehouse_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- migrate:down
DROP TABLE fulfillment_batches;
