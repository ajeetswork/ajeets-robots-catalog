const { buildRobotProfile } = require('../models/RobotProfile.js');

function renderProductGrid(records) {
  return records.map(buildRobotProfile);
}

module.exports = { renderProductGrid };
