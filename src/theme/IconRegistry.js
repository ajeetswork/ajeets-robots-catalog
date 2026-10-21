const statusIcons = require('../assets/IconMap.js');

function iconForStatus(status) {
  return statusIcons[status] || 'circle-help';
}

module.exports = { iconForStatus };
