const { WarehouseClient } = require('../integrations/WarehouseClient.js');

async function syncInventory(items) {
  const client = new WarehouseClient();
  return client.push(items);
}

module.exports = { syncInventory };
