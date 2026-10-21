const { buildRobotProfile } = require('../models/RobotProfile.js');

function renderProductCard(record) {
  const robot = buildRobotProfile(record);
  return `${robot.name} [${robot.sku}]`;
}

module.exports = { renderProductCard };
