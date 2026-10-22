-- migrate:up
CREATE INDEX idx_shipments_tracking_number ON shipments (tracking_number);
