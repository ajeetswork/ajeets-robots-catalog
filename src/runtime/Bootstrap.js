const defaults = require('../config/runtimeDefaults.js');

function bootstrapConfig(overrides = {}) {
  return { ...defaults, ...overrides };
}

module.exports = { bootstrapConfig };
