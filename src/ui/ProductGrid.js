const { buildRobotProfile } = require('../models/robotprofile.js');

function renderProductGrid(records) {
  return records.map(buildRobotProfile);
}

module.exports = { renderProductGrid };
