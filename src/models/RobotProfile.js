function buildRobotProfile(record) {
  return {
    sku: record.sku,
    name: record.name,
    family: record.family,
    active: record.active !== false
  };
}

module.exports = { buildRobotProfile };
