-- migrate:up
ALTER TABLE shipments RENAME COLUMN carrier_ref TO carrier_reference;

-- migrate:down
ALTER TABLE shipments RENAME COLUMN carrier_code TO carrier_ref;
