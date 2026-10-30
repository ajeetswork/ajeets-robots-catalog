const defaults = require('../config/RuntimeDefaults.js');

function bootstrapConfig(overrides = {}) {
  return { ...defaults, ...overrides };
}

module.exports = { bootstrapConfig };
