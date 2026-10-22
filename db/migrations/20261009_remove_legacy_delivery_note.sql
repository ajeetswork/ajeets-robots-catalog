-- migrate:up
ALTER TABLE orders DROP COLUMN legacy_delivery_note;

-- migrate:down
ALTER TABLE orders ADD COLUMN legacy_delivery_note TEXT;
