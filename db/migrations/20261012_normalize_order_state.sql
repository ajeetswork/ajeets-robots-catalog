-- migrate:up
-- Release note: this is a one-way normalization. Historical values collapse into
-- the current state vocabulary; prior spellings are not retained in-row.
UPDATE orders
SET state = CASE
  WHEN state IN ('awaiting_pick', 'awaiting-pack', 'ready_to_pack') THEN 'packing'
  WHEN state IN ('sent', 'dispatched') THEN 'shipped'
  ELSE state
END;

-- migrate:down
-- irreversible: original legacy state labels cannot be reconstructed after normalization.
-- Recovery model: restore the affected rows from the pre-deploy database snapshot if exact
-- historical labels are required.
SELECT 1;
